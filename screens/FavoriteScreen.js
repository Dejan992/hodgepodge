
import _ from 'lodash'
import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View, Alert, Linking } from 'react-native';
import { Card, Text, Button, Image, Icon, List, ListItem } from 'react-native-elements'
import { CardList } from '../components/CardList'
import * as actions from '../actions'
import { SearchText } from '../components/SearchText'


export default class FavoriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Favorite Albums',
  };
  constructor() {
    super()
    this.state = {
      favoriteAlbums: undefined
    }
    this.getFavoriteAlbums()
  }
  componentDidMount() {

  }
  getFavoriteAlbums = async () => {
    const favoriteAlbums = await actions.retrieveData('favoriteAlbums')
    if (favoriteAlbums) {
      this.setState({ favoriteAlbums })
    }
  }
  deleteAlbum = async (albumId) => {
    const { favoriteAlbums } = this.state
    delete favoriteAlbums[albumId]
    const success = await actions.storeData('favoriteAlbums', favoriteAlbums);
    if (success) {
      this.setState({ favoriteAlbums })
    }
  }
  //code for playing song within the app
  async playSong(track, index) {
    if ( this.currentSong &&  this.state.isPlaying ) { this.currentSong.stopAsync()  }

    try {
      const { sound: soundObject, status } = await Expo.Audio.Sound.createAsync(
         {uri: track.preview},
         { shouldPlay: true }
      );
      // Your sound is playing!
      this.currentSong = soundObject;
      this.currentSong.playAsync();
      this.setState({isPlaying: true, currentSongIndex: index});
    } catch (error) {
      // An error occurred!
      this.setState({isPlaying: false, currentSongIndex: undefined});
    }
  }

  async stopSong() {
    const { isPlaying, currentSongIndex } = this.state;

    if ( this.currentSong && isPlaying ) {
      this.currentSong.stopAsync();
      this.setState({currentSongIndex: undefined, isPlaying: false});
    }
  }

  renderIcon(track, index) {
    const { isPlaying, currentSongIndex } = this.state;


    if (currentSongIndex === index && isPlaying) {
      return (
        <Icon raised
              name='stop-circle'
              type='font-awesome'
              color='#f50'
              onPress={() => this.stopSong(track, index)}
        />
      )
    } else {
      return (
        <Icon raised
              name='play-circle'
              type='font-awesome'
              color='#f50'
              onPress={() => this.playSong(track, index)}
        />
      )
    }
  }
  
  renderFavoriteTracks = (tracks) => {
    if (tracks) {
      return _.map(tracks, (track, id) => {
        return (
          <ListItem
            key={id}
            title={track.title}
            rightIcon={this.renderIcon(track, id)
            } />
        )
      })
    }
  }
  renderFavoriteAlbums = () => {
    const { favoriteAlbums } = this.state
    console.log('favoriteAlbums', favoriteAlbums)

    if (favoriteAlbums) {
      return _.map(favoriteAlbums, (album, id) => {
        return (
          <View key={id}>
            <Card
              title={album.title}>
              <Button
                title='Delete'
                raised
                backgroundColor='#f50'
                name='trash'
                onPress={() => { this.deleteAlbum(album.id) }} />
              {this.renderFavoriteTracks(album.tracks)}
            </Card>
          </View>
        )
      })
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <List containerStyle={styles.listContainer}>
          {this.renderFavoriteAlbums()}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  listContainer: {
    backgroundColor: '#eaeaea'
  }
});
