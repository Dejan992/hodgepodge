import React from 'react';
import { ScrollView, StyleSheet, Button, View, ActivityIndicator, Linking, Alert } from 'react-native';
import { Text, Avatar, Icon, Divider, List, ListItem } from 'react-native-elements'
import * as actions from '../actions'

export default class AlbumDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'AlbumDetail',
  };
  constructor() {
    super()
    this.state = {
      tracks: []
    }
  }
  async componentDidMount() {
    const album = this.props.navigation.getParam('album', {})
    const tracks = await actions.searchAlbumTracks(album.id)
    this.setState({
      tracks
    })
  }

  saveTrackToFavorite = async (album, track) => {
    //step one - get favorite album, if empty create {} for it to be stored
    const favoriteAlbums = await actions.retrieveData('favoriteAlbums') || {}
    let albumData = favoriteAlbums[album.id]
    if (!albumData) {
      albumData = album
    }
    if (!albumData['tracks']) {
      albumData['tracks'] = {}
    }
    albumData['tracks'][track.id] = track;
    //reasign albums to favoriteAlbum, because it might be empty
    favoriteAlbums[album.id] = albumData
    const success = await actions.storeData('favoriteAlbums', favoriteAlbums)
    if (success) {
      // Works on both iOS and Android
      Alert.alert(
        'Track Added',
        `Track: ${track.title} from ${track.artist.name} was added to Favorites!`,
        [
          { text: 'Continue', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }
  }

  renderTracks = (album) => {
    const { tracks } = this.state
    if (tracks.length) {

      return tracks.map((track, index) => {
        return (
          <ListItem
            key={index}
            title={track.title}
            leftIcon={{ name: 'play-arrow' }}
            leftIconOnLongPress={() => { Linking.openURL(track.preview) }}
            rightIcon={
              <Icon
                raised
                name='star'
                type='font-awesome'
                color='#09A9F4'
                onPress={() => { this.saveTrackToFavorite(album, track) }} />
            }
          />

        )
      })

    }
  }
  render() {

    const album = this.props.navigation.getParam('album', {})
    const artist = this.props.navigation.getParam('artist', '')
    if (album.id) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Avatar xlarge rounded source={{ uri: album.cover_medium }} />
            </View>
            <View style={styles.headerRight}>
              <Text h4 style={styles.mainText}>{album.title} </Text>
              <Text h4 style={styles.subText}>{artist}</Text>
              <Icon
                raised
                name='play'
                type='font-awesome'
                color='#09A9F4'
                size={30}
                onPress={() => Linking.openURL(this.state.tracks[0].preview)} />
            </View>
          </View>
          <Divider style={{ backgroundColor: 'black' }} />
          <List containerStyle={{ marginTop: 0 }}>
            {this.renderTracks(album)}
          </List>
        </ScrollView>
      );
    } else {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20
  },
  avatar: {
    flex: 1,
    marginRight: 5
  },
  headerRight: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  mainText: {
    fontWeight: 'bold',
    color: '#3a3a3a',
    fontSize: 17
  },
  subText: {
    color: '#3a3a3a',
    fontSize: 17
  }
});
