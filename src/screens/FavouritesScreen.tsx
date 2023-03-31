import React from 'react';
import {FlatList, Text, SafeAreaView, StyleSheet} from 'react-native';
import {TvShow} from './../model/tv-show.type';
import TvShowCompactTouchable from './../components/TvShowCompactTouchable';
import {useSelector} from 'react-redux';
import {getFavouriteTvShows} from '../store';

export default function FavouritesScreen({navigation}: any) {
  const favourites = useSelector(getFavouriteTvShows);

  function onPressTvShow(item: TvShow) {
    navigation.navigate('Details', {tvShow: item});
  }

  return (
    <SafeAreaView>
      <FlatList
        data={favourites}
        renderItem={({item}) => (
          <TvShowCompactTouchable
            tvShow={item}
            onPress={() => onPressTvShow(item)}
          />
        )}
        ListEmptyComponent={<EmptyFavouritesList />}
        keyExtractor={item => String(item.show.id)}
      />
    </SafeAreaView>
  );
}

function EmptyFavouritesList() {
  return <Text style={styles.bodyText}>No favourites added</Text>;
}

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 14,
    paddingTop: 24,
    textAlign: 'center',
  },
});
