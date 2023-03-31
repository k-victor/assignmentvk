import {getPersistedData, persistData} from './persist-data.service';
import {PersistedTvShowQueryResult, TvShow} from './tv-show.type';

const persistQueryKeyPrefix = 'query-';
const persistFavouriteKeyPrefix = 'favourite-tv-shows';
const fetchTimeoutMs = 8000;
let activeAbortController: AbortController | null = null;

export async function getTvShows(query: string): Promise<Array<TvShow>> {
  const persistedQueryResult =
    await getPersistedData<PersistedTvShowQueryResult>(
      persistQueryKeyPrefix + query,
    );

  if (persistedQueryResult) {
    return persistedQueryResult;
  } else {
    const queryResult = await fetchTvShows(query);
    await persistData<PersistedTvShowQueryResult>(
      persistQueryKeyPrefix + query,
      queryResult,
    );

    return queryResult;
  }
}

async function fetchTvShows(query: string): Promise<Array<TvShow>> {
  try {
    if (activeAbortController) {
      activeAbortController.abort();
    }

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, fetchTimeoutMs);
    activeAbortController = abortController;

    const response = await fetch(
      'https://api.tvmaze.com/search/shows?q=' + query,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal: abortController.signal,
      },
    );

    clearTimeout(timeoutId);
    activeAbortController = null;

    if (response.ok) {
      const responseJson = await response.json();

      return responseJson;
    } else {
      throw new Error(
        'Something went wrong when searching for TV shows. Please try again later.',
      );
    }
  } catch (e) {
    throw new Error('Network error. Please check your internet connection');
  }
}

export function isFavouriteTvShow(favourites: Array<TvShow>, tvShow: TvShow) {
  return favourites.some((f: TvShow) => f.show.id === tvShow.show.id);
}

export async function persistTvShowsAsFavourites(
  tvShows: Array<TvShow>,
): Promise<void> {
  return await persistData<Array<TvShow>>(persistFavouriteKeyPrefix, tvShows);
}

export async function allPersistedFavouriteTvShows(): Promise<Array<TvShow>> {
  const persistedFavourites = await getPersistedData<Array<TvShow>>(
    persistFavouriteKeyPrefix,
  );

  if (persistedFavourites) {
    return persistedFavourites;
  } else {
    return [];
  }
}

export function addTvShowToAListOfFavourites(
  favourites: Array<TvShow>,
  tvShow: TvShow,
): Array<TvShow> {
  return favourites.every((favourite: TvShow) => favourite.show.id !== tvShow.show.id)
    ? favourites.concat(tvShow)
    : favourites;
}

export function removeTvShowFromAListOfFavourites(
  favourites: Array<TvShow>,
  tvShow: TvShow,
): Array<TvShow> {
  return favourites.filter(
    (favourite: TvShow) => favourite.show.id !== tvShow.show.id,
  );
}
