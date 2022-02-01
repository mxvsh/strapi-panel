import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider, StatusBar} from 'native-base';
import {CachePolicies, Provider as HttpProvider} from 'use-http';

import {AuthStore} from './src/store/auth';
import {StrapiStore} from './src/store/strapi';
import AuthProvider from './src/provider/auth';
import {theme} from './theme';

import HomeScreen from './src/screens/home';
import LoginScreen from './src/screens/login';
import ContentScreen from './src/screens/content';
import {LogBox} from 'react-native';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const httpOptions = {
  cachePolicy: CachePolicies.NO_CACHE,
  interceptors: {
    request: async ({options}) => {
      const jwt = await AsyncStorageLib.getItem('jwt');

      if (jwt) {
        Object.assign(
          options.headers,
          jwt
            ? {
                Authorization: `Bearer ${jwt}`,
              }
            : {},
        );
      }

      return options;
    },
  },
};

LogBox.ignoreAllLogs();

function App() {
  const {user} = AuthStore.useState();
  const {host} = StrapiStore.useState();

  return (
    <HttpProvider url={host} options={httpOptions}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />

      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom',
              }}>
              {user ? (
                <Stack.Screen name="Home" component={HomeScreen} />
              ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
              )}
              <Stack.Screen name="Content" component={ContentScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </NativeBaseProvider>
    </HttpProvider>
  );
}

export default App;
