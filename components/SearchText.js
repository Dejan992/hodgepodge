import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements'
export class SearchText extends React.Component {
  state = {
    value: ''
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

  render() {
    return (
      <React.Fragment>
        <FormLabel containerStyle={styles.center}>Tell me how you feel...</FormLabel>
        <FormInput ref={input => this.input = input} onChangeText={(e) => this.handleChange(e)} />
        <FormValidationMessage />
        <Button title='Search' onPress={(e) => { this.handleSubmit(e) }} />
      </React.Fragment>
    )
  }
}


const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }
})
