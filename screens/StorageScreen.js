import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements'
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
        <Text>{value} </Text>
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
});
