import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SongCard from '../../components/SongCard/SongCard';
import music_data from '../../music-data.json';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  isSoldOut: boolean;
  imageUrl: string;
}

export default function HomeScreen() {

  const renderSong = ({item}: {item: Song}) => <SongCard song={item} />;
  const renderSeparator = () => <View style={styles.seperator} />;
  
  return (
    <SafeAreaView style = {styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ color:'white',fontSize: 24, fontWeight: '600' }}>Music Library</Text>
      </View>
      <FlatList
        data={music_data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSong}
        ItemSeparatorComponent={ renderSeparator }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  seperator: {
    height: 2,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
