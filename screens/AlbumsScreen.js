import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Card, Text, Button, Image, Icon } from 'react-native-elements'
import { CardList } from '../components/CardList'
import * as actions from '../actions'
import { SearchText } from '../components/SearchText'
export default class AlbumsScreen extends React.Component {
  static navigationOptions = {
    title: 'AlbumsScreen',
  };
  constructor() {
    super()
    this.state = {
      albums: [],
      isFetching: false,
      artist: ''
    }


  }
  searchTracks = async (artist) => {
    try {
      this.setState({ isFetching: true, albums: [] })
      const albums = await actions.searchTracks(artist)
      this.setState({
        albums,
        isFetching: false,
        artist
      })
    } catch (err) {
      console.error(err)
    }
  }

  saveAlbumToFavorite = async (album) => {
    const favoriteAlbums = await actions.retrieveData('favoriteAlbums') || {}

    if (favoriteAlbums[album.id]) {
      //dispally some msg
      // Alert.alert(
      //   `Ablum is already in Favorites!`,
      //   [
      //     { text: 'Continue', onPress: () => console.log('OK Pressed') },
      //   ],
      //   { cancelable: false }
      // )
      return false
    }
    favoriteAlbums[album.id] = album
    const success = await actions.storeData('favoriteAlbums', favoriteAlbums)
    if (success) {
      Alert.alert(
        'Album Added',
        `Ablum: ${album.title} from ${this.state.artist} was added to Favorites!`,
        [
          { text: 'Continue', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }
  }
  renderBottomNavigation = (album) => {
    const { artist } = this.state
    return (
      <View style={styles.albumMenu}>
        <Icon
          onPress={() => { }}
          raised
          name='play'
          type='font-awesome'
          color='#6495ED'
          size={30} />
        <Icon
          onPress={() => { this.props.navigation.navigate('AlbumDetail', { album, artist }) }}
          raised
          name='info'
          type='font-awesome'
          color='black'
          size={30} />
        <Icon
          onPress={() => { this.saveAlbumToFavorite(album) }}
          raised
          name='thumbs-up'
          type='font-awesome'
          color='#DC143C'
          size={30} />
      </View>
    )
  }
  renderAlbumView = () => {
    const { albums, isFetching } = this.state
    return (
      <ScrollView style={styles.container}>
        <SearchText submitSearch={this.searchTracks} />
        {!isFetching ?
          <CardList
            data={this.state.albums}
            imageKey={'cover_big'}
            titleKey={'title'}
            buttonText='Details'
            bottomView={this.renderBottomNavigation} />
          :
          <ActivityIndicator size="large" color="#0000ff" />
        }


      </ScrollView>
    )
  }

  render() {
    return this.renderAlbumView()
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  albumMenu: {
    flexDirection: 'row',
    justifyContent: "space-between"
  }
});
