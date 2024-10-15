import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/Login';
import CreateUser from './src/screens/CreateUser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator(); // Define o tipo para o Stack Navigator

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateUser"
          component={CreateUser}
          options={{ title: 'Criar Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
