import React from 'react';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import {Text, FormLabel, FormInput, Button, FormValidationMessage, Icon } from 'react-native-elements'

import { Camera, Permissions } from 'expo';
export class SearchText extends React.Component {
  state = {
    value: '',
    camera: false
  }
  componentDidMount() {
    this.input.focus()
  }
  handleChange = (value) => {
    this.setState({
      value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitSearch(this.state.value)
  }
  handlePicture = (value) => {
    this.props.submitSearch(value)
  }
  handlePressCamera = () => {
    this.setState((prevState) => ({
      camera: !prevState.camera
    }))
  }
  render() {
    const disabled = this.state.value.length
    return (
      <React.Fragment >

        <FormLabel containerStyle={styles.center}
            >Tell me how you feel...</FormLabel>
        <React.Fragment>
        <FormInput ref={input => this.input = input} onChangeText={(e) => this.handleChange(e)} />
        <FormValidationMessage />
        <Button disabled={!disabled} title='Search' onPress={(e) => { this.handleSubmit(e) }} /> 
        </React.Fragment>
        
    </React.Fragment>
    )
  }
}


const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }, icon : { 
    flexDirection: 'row', 
     }
})
