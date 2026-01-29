import React from 'react';
import { TextInput, View } from 'react-native';
// import { SearchBar } from 'react-native-screens';
import styles from './SearchBar.styles';

const SearchBar = (props) => {
    return (
    <View style={styles.container}>
        <TextInput placeholder='Ara' onChangeText={props.onSearch} style={styles.input} />
    </View>
    );
};

export default SearchBar;