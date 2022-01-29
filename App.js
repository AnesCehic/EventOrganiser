/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View} from 'react-native';

import {Provider} from 'react-redux';

import Navigation from './src/navigation';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Navigation />
      </View>
    </Provider>
  );
};

export default App;
