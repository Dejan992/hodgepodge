import React from 'react';
import { View, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements'
import * as actions from '../actions'
export default class StorageScreen extends React.Component {
  static navigationOptions = {
    title: 'Storage',
  };
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  storeData = async () => {
    const data = {
      value: 'some testing data'
    }
    const value = await actions.storeData('someKey', data)
    if (value) {
      console.log('this is my store', this.state.value)
    }
  }
  retreiveData = async () => {
    this.setState({
      value: ''
    })

    const data = await actions.retrieveData('favoriteAlbums')
    if (data) {
      console.log('this happpened??????', data)
      this.setState({ value: data.value })
    }
  }
  deleteData = async () => {
    const clear = await actions.clearStorage()
    if (clear) {
      this.setState({ value: '' })
    }
  }
  render() {
    const { value } = this.state
    return (
      <ScrollView style={styles.container}>
        <Button title='store data' onPress={() => { this.storeData() }} />
        <Button title='retreive data' onPress={() => { this.retreiveData() }} />
        <Button title='delete data' onPress={() => { this.deleteData() }} />
        <Text h4>{value} </Text>

        <Divider backgroundColor={{ backgroundColor: 'black' }} />

        <Text h3>Touchables</Text>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  }, button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
