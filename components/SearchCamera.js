import React from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Text, FormLabel, FormInput, Button, FormValidationMessage, Icon } from 'react-native-elements'

import { Camera, Permissions } from 'expo';
let takePicture = true
export class SearchCamera extends React.Component {
  state = {
    value: '',
    camera: true,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  }
  //camera functions that can be in different component but i just want to try and see if it works.
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async () => {
    takePicture = !takePicture
    if (this.camera) {
        Alert.alert(
           'Please wait',
           `Your picture is being processed, click Continue and wait for blue button on the bottom of screen`,
           [
             { text: 'Continue', onPress: () => console.log('OK Pressed') },
           ],
           { cancelable: false }
         )
    const data = await this.camera.takePictureAsync({base64: true})
    this.identifyImage(data.base64)
    }
  };
  identifyImage(imageData){

    // Initialise Clarifai api
    const Clarifai = require('clarifai');

    const app = new Clarifai.App({
        apiKey: '6c8a2c78da2a471fbc49996827fa35f6'
    });

    // Identify the image
    app.models.predict('e466caa0619f444ab97497640cefc4dc', {base64: imageData})
    .then((response) => {
        console.log('we got our data back??', response.outputs[0].data.regions[0].data.face.identity.concepts[0].name)
        this.setState({
            value: response.outputs[0].data.regions[0].data.face.identity.concepts[0].name
        })})
  }
renderCameraView() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, height:600, width: '100%' }}>
          <Camera  ref={ref => {
            this.camera = ref;
          }} style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <View style={styles.center}>
          {takePicture ?
          <Icon 
          style={{flex:1, alignSelf: 'center'}}
          raised
          size={40}
          name='camera'
          type='font-awesome'
          color='#f50'
          onPress={() => this.takePicture()} />
        
        //   <Button  title='Take Picture' onPress={this.takePicture}/>
          : <View />
       
        }
          {!takePicture && this.state.value ?
          <Button 
          title='Your results are ready, click here to go back' 
          onPress={this.handlePressCamera}
          backgroundColor="#08A9F4"
          /> 
        : <View />}
        </View>
        </View>
      );
    }
    
  }


//search components yet to be polished
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitSearch(this.state.value)
  }
//   handlePicture = (value) => {
//     this.props.submitSearch(value)
//   }
  handlePressCamera = () => {
    this.setState((prevState) => ({
      camera: !prevState.camera
    }))
    takePicture = 0
  }
  handleChange = (value) => {
    this.setState({
      value
    })
  }
  render() {
    const disabled = this.state.value.length
    return (
      <React.Fragment >
          {
        this.state.camera 
        ? 
        this.renderCameraView()
        : 
        <React.Fragment>
        <FormInput ref={input => this.input = input} value={this.state.value} onChangeText={(e) => this.handleChange(e)}/>
        <FormValidationMessage />
        <Button disabled={!disabled} title='Search' onPress={(e) => { this.handleSubmit(e) }}  /> 
        </React.Fragment>
        }
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
