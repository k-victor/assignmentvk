import {applyMiddleware, createStore} from 'redux';
import {TvShow} from './model/tv-show.type';
import {persistTvShowsAsFavourites} from './model/tv-show.service';

export const setFavourites = (tvShows: Array<TvShow>) => ({
  type: 'favouriteTvShows/set',
  payload: tvShows,
});

export const addFavourite = (tvShow: TvShow) => ({
  type: 'favouriteTvShows/add',
  payload: tvShow,
});

export const removeFavourite = (tvShow: TvShow) => ({
  type: 'favouriteTvShows/remove',
  payload: tvShow,
});

export function getFavouriteTvShows(state: any) {
  return state.favouriteTvShows;
}

function favouriteTvShowsReducer(state = {favouriteTvShows: []}, action: any) {
  switch (action.type) {
    case 'favouriteTvShows/add':
      return {favouriteTvShows: state.favouriteTvShows.concat(action.payload)};
    case 'favouriteTvShows/remove':
      return {
        favouriteTvShows: state.favouriteTvShows.filter(
          (favourite: TvShow) => favourite.show.id !== action.payload.show.id,
        ),
      };
    case 'favouriteTvShows/set':
      return {favouriteTvShows: action.payload};
    default:
      return state;
  }
}

const persistFavourites = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  if (
    action.type === 'favouriteTvShows/add' ||
    action.type === 'favouriteTvShows/remove'
  ) {
    persistTvShowsAsFavourites(store.getState().favouriteTvShows);
  }

  return result;
};

export const store = createStore(
  favouriteTvShowsReducer,
  applyMiddleware(persistFavourites),
);
