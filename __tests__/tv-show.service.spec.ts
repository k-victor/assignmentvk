import {
  getTvShows,
  isFavouriteTvShow,
  persistTvShowsAsFavourites,
  allPersistedFavouriteTvShows,
} from '../src/model/tv-show.service';
import {TvShow} from '../src/model/tv-show.type';

const tvShowMock1: TvShow = {
  score: 0.123,
  show: {
    id: 312,
    image: null,
    name: 'A Tv show',
    summary: 'About nothing',
    premiered: '1990-01-01',
  },
};

const tvShowMock2: TvShow = {
  score: 0.456,
  show: {
    id: 645,
    image: null,
    name: 'Another Tv show',
    summary: 'About nothing',
    premiered: '1991-01-01',
  },
};

const tvShowMock3: TvShow = {
  score: 0.789,
  show: {
    id: 978,
    image: null,
    name: 'A third Tv show',
    summary: 'About nothing',
    premiered: '1992-01-01',
  },
};

let fetchCounter = 0;

beforeEach(() => {
  fetchCounter = 0;
});

it('GetTvShows should use persisted data if same query is used again', async () => {
  fetch = jest.fn(() => {
    fetchCounter = fetchCounter + 1;

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([tvShowMock1, tvShowMock2, tvShowMock3]),
    });
  });
  AbortController = jest.fn(() => ({
    abort: () => {},
  }));

  const response1 = await getTvShows('a query');
  const response2 = await getTvShows('a query');
  await getTvShows('a different query');

  expect(fetchCounter).toBe(2);
  expect(response1).toEqual(response2);
});

it('isFavouriteTvShow ', () => {
  expect(isFavouriteTvShow([tvShowMock1, tvShowMock2], tvShowMock1)).toBe(true);
  expect(isFavouriteTvShow([tvShowMock1, tvShowMock2], tvShowMock2)).toBe(true);
  expect(isFavouriteTvShow([tvShowMock1, tvShowMock2], tvShowMock3)).toBe(
    false,
  );
  expect(isFavouriteTvShow([], tvShowMock1)).toBe(false);
});

it('Persisting favourites ', async () => {
  persistTvShowsAsFavourites([tvShowMock1, tvShowMock2]);
  expect(await allPersistedFavouriteTvShows()).toEqual([
    tvShowMock1,
    tvShowMock2,
  ]);

  persistTvShowsAsFavourites([tvShowMock2]);
  expect(await allPersistedFavouriteTvShows()).toEqual([tvShowMock2]);

  persistTvShowsAsFavourites([]);
  expect(await allPersistedFavouriteTvShows()).toEqual([]);

  persistTvShowsAsFavourites([tvShowMock1, tvShowMock3, tvShowMock2]);
  expect(await allPersistedFavouriteTvShows()).toEqual([
    tvShowMock1,
    tvShowMock3,
    tvShowMock2,
  ]);
});
