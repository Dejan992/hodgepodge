
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
  renderFavoriteTracks = (tracks) => {
    if (tracks) {
      return _.map(tracks, (track, id) => {
        return (
          <ListItem
            key={id}
            title={track.title}
            leftIcon={{ name: 'play-arrow' }}
            rightIcon={
              <Icon
                raised
                name='music'
                type='font-awesome'
                color='#f50'
                onPress={() => Linking.openURL(track.preview)}
              />
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
