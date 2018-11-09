import axios from 'axios';
import _ from 'lodash'
import { AsyncStorage } from 'react-native'

const API_KEY = 'lp2u6ATTiamshFdLg2uJUvFNQ9Lwp1LKVBXjsnkDOke4Y47wjv'
const axiosInstance = axios.create({
  baseURL: 'https://deezerdevs-deezer.p.mashape.com/',
  timeout: 1000,
  headers: { 'X-Mashape-Key': API_KEY }
});



export const searchTracks = async (nameOfSinger) => {
  const { data } = await axiosInstance.get(`search?q=${nameOfSinger}`)
  const albums = data.data.map(item => item.album)
  const uniqueAlbums = _.uniqBy(albums, 'title')
  return uniqueAlbums
}
export const searchAlbumTracks = async (id) => {
  const { data } = await axiosInstance.get(`album/${id}`)
  const tracks = data.tracks.data

  return tracks
}
//google image api to get meta data from the picture
//clarifai
//amazon



//async storage react-native

export const storeData = async (key, value) => {
  const stringifyValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, stringifyValue);
    return value
  } catch (error) {
    // Error saving data
    console.error(error)
  }
}
//fetch data
export const retrieveData = async (key) => {
  try {

    const value = await AsyncStorage.getItem(key);
    console.log('retrive data', value);
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (error) {
    // Error retrieving data
  }
}
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true
  } catch (error) {
    // Error saving data
    console.error(error)
  }
}
