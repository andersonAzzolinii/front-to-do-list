import axios from 'axios';
import { BASE_URL } from '../config';

export interface User {
  username: string;
  password: string;
}

export const login = async (userData: User): Promise<any> => {
  try {
    return await axios.post(`${BASE_URL}/auth`, userData, {
      timeout: 3000
    });
  } catch (error: any) {
    if (error.response) {
      return error.response
    }
  }
};
