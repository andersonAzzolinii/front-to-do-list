import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoadingComponent from './src/screens/components/Loading';
import Home from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import CreateScreen from './src/screens/CreateUser';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/routes';
import { NotificationProvider } from "./src/contexts/NotificationContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './src/contexts/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
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
    <NotificationProvider>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Home' }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Login' }}
            />
            <Stack.Screen
              name="CreateUser"
              component={CreateScreen}
              options={{ title: 'New user' }}
            />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </NotificationProvider>
  );
};

export default App;
