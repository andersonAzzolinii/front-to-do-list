import axios from 'axios';
import { BASE_URL } from '../config';


export interface User {
  username: string;
  password: string;
}

export const createUser = async (userData: User): Promise<any> => {
  try {
    return await axios.post(`${BASE_URL}/auth/create`, userData,
      { timeout: 3000});
  } catch (error: any) {
    if (error.response) {
      return error.response
    }
    return error
  }
};
