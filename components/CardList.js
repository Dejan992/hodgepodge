import React from 'react';
import { Card, Button } from 'react-native-elements';
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export class CardList extends React.Component {

  renderData() {
    console.log(this.props)
    const { data, imageKey, titleKey, buttonText, bottomView } = this.props;
    return data.map((item, index) => (
      <Card
        title={item[titleKey]}
        key={index}
        image={{ uri: item[imageKey] }}
      >
        {bottomView(item)}
      </Card>
    ))
  }

  render() {
    if (this.props.data) {
      return this.renderData()
    } else {
      return (
        <View />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
