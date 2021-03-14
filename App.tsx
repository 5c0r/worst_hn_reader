import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeContainer from './containers/HomeContainer';
import NewsContainer from './containers/NewsContainer';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer linking={{ enabled: true }}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeContainer} />
        <Stack.Screen name="News" component={NewsContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}