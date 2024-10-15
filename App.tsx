import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/Login';
import CreateUser from './src/screens/CreateUser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/routes';
import {
  NotificationProvider,
  useNotification,
} from "./src/contexts/NotificationContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NotificationProvider >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="CreateUser"
            component={CreateUser}
            options={{ title: 'New user' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
}
