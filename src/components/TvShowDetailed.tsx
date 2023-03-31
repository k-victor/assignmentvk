import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {TvShow} from './../model/tv-show.type';
import {isFavouriteTvShow} from './../model/tv-show.service';
import RenderHtml from 'react-native-render-html';
import {addFavourite, getFavouriteTvShows, removeFavourite} from '../store';
import {useDispatch, useSelector} from 'react-redux';

export default function TvShowDetailed(props: {tvShow: TvShow}) {
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const favourites = useSelector(getFavouriteTvShows);

  const errorChangingFavourite = false;

  function onAddAsFavourite(): void {
    dispatch(addFavourite(props.tvShow));
  }

  function onRemoveAsFavourite(): void {
    dispatch(removeFavourite(props.tvShow));
  }

  return (
    <ScrollView contentContainerStyle={styles.tvShowContainer}>
      {props.tvShow.show.image ? (
        <Image
          style={styles.tvShowImage}
          source={{uri: props.tvShow.show.image.medium}}
        />
      ) : null}

      <Text style={styles.tvShowName}>{props.tvShow.show.name}</Text>

      {isFavouriteTvShow(favourites, props.tvShow) ? (
        <Button
          title="Remove as favourite"
          color="#FF0000"
          onPress={onRemoveAsFavourite}
        />
      ) : (
        <Button
          title="Add as favourite"
          color="#2da44e"
          onPress={onAddAsFavourite}
        />
      )}
      {errorChangingFavourite ? (
        <Text style={styles.bodyText}>
          There was an error changing your favourite TV shows list, please try
          again.
        </Text>
      ) : null}
      {props.tvShow.show.premiered ? (
        <Text style={styles.tvShowPremiered}>
          Premiered: {props.tvShow.show.premiered}
        </Text>
      ) : null}
      {props.tvShow.show.summary ? (
        <View style={styles.tvShowSummary}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: props.tvShow.show.summary,
            }}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tvShowContainer: {
    gap: 12,
    paddingBottom: 48,
  },
  tvShowImage: {
    resizeMode: 'contain',
    height: 200,
    aspectRatio: 1,
    alignSelf: 'center',
  },
  tvShowName: {
    alignSelf: 'center',
    fontSize: 32,
    paddingLeft: 18,
    paddingRight: 18,
  },
  tvShowSummary: {
    fontSize: 14,
    paddingLeft: 24,
    paddingRight: 24,
  },
  tvShowPremiered: {
    fontSize: 12,
    color: '#555',
    paddingLeft: 24,
  },
  bodyText: {
    fontSize: 14,
    paddingLeft: 24,
    paddingRight: 24,
  },
});