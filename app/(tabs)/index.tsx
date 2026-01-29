import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import SearchBar from '../../components/SearchBar';
import SongCard from '../../components/SongCard';
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

  const [list, setList] = useState(music_data);
  const renderSong = ({item}: {item: Song}) => <SongCard song={item} />;
  const renderSeparator = () => <View style={styles.seperator} />;
  const handleSearch = (text: string) => {
    const filteredList = music_data.filter(song => {
      const searchedText = text.toLowerCase();
      const currentTitle = song.title.toLowerCase();
      const currentArtist = song.artist.toLowerCase();
      const currentAlbum = song.album.toLowerCase();
      return currentTitle.includes(searchedText) || currentArtist.includes(searchedText) || currentAlbum.includes(searchedText);

            
      
    });
    setList(filteredList);
  };
  
  return (
    <SafeAreaView style = {styles.container}>
      <SearchBar onSearch={handleSearch}/>
      <FlatList
        data={list}
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
});
