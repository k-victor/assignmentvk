import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState, ReactElement, useEffect} from 'react';
import {TvShow} from './../model/tv-show.type';
import {
  allPersistedFavouriteTvShows,
  getTvShows,
} from './../model/tv-show.service';
import TvShowCompactTouchable from './../components/TvShowCompactTouchable';
import {useDispatch} from 'react-redux';
import {setFavourites} from '../store';

export default function SearchScreen({navigation}: any): ReactElement {
  const [tvShows, setTvShows] = useState<Array<TvShow>>([]);
  const [error, setError] = useState('');
  const [loadingTvShows, setLoadingTvShows] = useState(false);
  const dispatch = useDispatch();
  const searchDebounceTimeMs = 750;

  useEffect(() => {
    async function loadPersistedFavourites() {
      const persistedFavourites = await allPersistedFavouriteTvShows();
      dispatch(setFavourites(persistedFavourites));
    }

    loadPersistedFavourites();
  }, [dispatch]);

  let timeoutId: number = 0;

  async function getAndSetTvShows(query: string): Promise<void> {
    try {
      setError('');
      setLoadingTvShows(true);
      const responseJson = await getTvShows(query);
      setLoadingTvShows(false);
      setTvShows(responseJson);
    } catch (e) {
      setLoadingTvShows(false);

      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  function onChangeSearchQuery(searchQuery: string): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      getAndSetTvShows(searchQuery);
    }, searchDebounceTimeMs);
  }

  function onPressTvShow(item: TvShow) {
    navigation.navigate('Details', {tvShow: item});
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeSearchQuery}
          placeholder="Search TV shows"
        />
      </View>

      <SearchScreenBody
        loadingTvShows={loadingTvShows}
        error={error}
        tvShows={tvShows}
        onPressTvShow={onPressTvShow}
      />
    </SafeAreaView>
  );
}

function SearchScreenBody(props: {
  loadingTvShows: boolean;
  error: string;
  tvShows: Array<TvShow>;
  onPressTvShow: (item: TvShow) => void;
}): ReactElement {
  if (props.loadingTvShows) {
    return <ActivityIndicator size="large" color="#000" style={styles.body} />;
  } else if (props.error) {
    return (
      <View style={styles.body}>
        <Text style={styles.bodyText}>{props.error}</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        data={props.tvShows}
        renderItem={({item}) => (
          <TvShowCompactTouchable
            tvShow={item}
            onPress={() => props.onPressTvShow(item)}
          />
        )}
        ListEmptyComponent={<NoTvShowsToList />}
        keyExtractor={item => String(item.show.id)}
        style={styles.body}
      />
    );
  }
}

function NoTvShowsToList(): ReactElement {
  return <Text style={styles.bodyText}>Nothing to show</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: '#fff',
    flex: 1,
  },
  searchInputContainer: {
    backgroundColor: '#eee',
  },
  searchInput: {
    width: '75%',
    alignSelf: 'center',
    height: 44,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  bodyText: {
    paddingTop: 12,
    textAlign: 'center',
  },
});
