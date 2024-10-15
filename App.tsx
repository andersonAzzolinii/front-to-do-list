import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/Login';
import LoadingComponent from './src/screens/components/Loading';
import CreateUser from './src/screens/CreateUser';
import Home from './src/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/routes'
import { NotificationProvider } from "./src/contexts/NotificationContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    };

    checkToken();
  }, []);

  if (isLoggedIn === null) {
    return <LoadingComponent />; 
  }

  return (
    <NotificationProvider >
      <NavigationContainer>
        <Stack.Navigator >
          {isLoggedIn ? (
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Home' }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Login' }}
            />
          )}
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
