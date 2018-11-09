import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View } from 'react-native'
import { Button } from 'react-native-elements'
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {

    return (
      <React.Fragment>
        <View>
          <Button title='navigate to Storage' onPress={() => this.props.navigation.navigate('Storage')} />
        </View>
        <ExpoConfigView />
      </React.Fragment>
    )
  }
}
