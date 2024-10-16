import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './config';

async function api() {

  const token = await AsyncStorage.getItem('authToken');

  const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return apiService
};
export default api

