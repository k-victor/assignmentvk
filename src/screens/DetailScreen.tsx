import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import TvShowDetailed from './../components/TvShowDetailed';

export default function DetailScreen({route}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <TvShowDetailed tvShow={route.params.tvShow} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    flex: 1,
  },
  view: {
    paddingTop: 12,
  },
});
