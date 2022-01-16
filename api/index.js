import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screens/Home';
import Upload from './screens/Upload';

const Stack = createNativeStackNavigator();

const API = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Photo Upload APP' }}/>
        <Stack.Screen name="Upload" component={Upload}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default API;