import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactElement} from 'react';
import {TvShow} from './../model/tv-show.type';

export default function TvShowCompactTouchable(props: {
  tvShow: TvShow;
  onPress: () => void;
}): ReactElement {
  return (
    <TouchableOpacity style={styles.tvShow} onPress={props.onPress}>
      {props.tvShow.show.image ? (
        <Image
          style={styles.tvShowImage}
          source={{uri: props.tvShow.show.image.medium}}
        />
      ) : null}
      <View style={styles.textContainer}>
        <Text style={styles.tvShowName}>{props.tvShow.show.name}</Text>
        {props.tvShow.show.premiered ? (
          <Text style={styles.tvShowPremiered}>
            Premiered: {props.tvShow.show.premiered}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tvShowImage: {
    height: 50,
    resizeMode: 'contain',
    aspectRatio: 1,
    borderRadius: 10,
  },
  tvShow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 24,
    gap: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  tvShowName: {
    fontSize: 20,
  },
  tvShowPremiered: {
    fontSize: 10,
    color: '#777',
  },
});
