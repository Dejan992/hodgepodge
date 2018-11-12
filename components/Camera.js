import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, Permissions } from 'expo';
export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async () => {

    if (this.camera) {
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
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData})
    .then((response) => {console.log('this is my response from clarifai', response.outputs[0].data.concepts[0].name)});
}
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
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
          <Button title='snap' onPress={this.takePicture}/>
        </View>
      );
    }
  }
}