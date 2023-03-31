export type TvShow = {
  score: number;
  show: {
    id: number;
    image: {
      medium: string;
    } | null;
    name: string;
    summary: string | null;
    premiered: string | null;
  };
};

export type PersistedFavouriteTvShows = {
  [tvShowId: string]: TvShow;
};

export type PersistedTvShowQueryResult = Array<TvShow>;
