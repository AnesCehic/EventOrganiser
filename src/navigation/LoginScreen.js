import React from 'react';
import {Text, View, Button} from 'react-native';

import {connect} from 'react-redux';

import {increaseCounter, decreaseCounter} from '@redux/TestRedux/actions';

const LoginScreen = ({count, increaseCounter, decreaseCounter}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Screen</Text>
      <View>
        <Text style={{textAlign: 'center'}}>{count}</Text>
        <View>
          <Button title="Increase" onPress={increaseCounter} />
          <Button title="Decrease" onPress={decreaseCounter} />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    count: state.testReducer.count,
  };
};

export default connect(mapStateToProps, {increaseCounter, decreaseCounter})(
  LoginScreen,
);
