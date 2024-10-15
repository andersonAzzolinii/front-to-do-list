
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  CreateUser: undefined;
  Home: undefined
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
