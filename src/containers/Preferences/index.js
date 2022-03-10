import React, {useState, useContext} from 'react';
import {View, Text, Switch, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SubmitButton, LoadingIndicator} from '@components';
import {UserContext} from '@contexts';
import {UsersService} from '@services/apiClient';
import {toast} from '@utils';

import {Styles} from '@common';

import styles from './styles';

const Preferences = () => {
  const {chatForbiden, setChatForbiden} = useContext(UserContext);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [allowMsgEnabled, setAllowMsgEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {setAuthenticated} = useContext(UserContext);

  const anonModeToggle = async value => {
    try {
      const anonymousMode = value ? 'enabled' : 'disabled';
      await AsyncStorage.setItem('@anonymousMode', anonymousMode);
      setChatForbiden(value);
    } catch (error) {
      console.log('[Error set switch anon mode]', error);
    }
  };

  const alertDeleteUser = () => {
    Alert.alert('Are you sure you want to delete your account?', '', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: handleDeleteUser},
    ]);
  };

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorage.getItem('@userId');
      await UsersService.remove(userId);
      // -- toast here --
      setAuthenticated(false);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error delete user]', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDarkMode = () => {
    return (
      <View style={styles.switch}>
        <Text style={styles.switchText}>Dark Mode</Text>
        <Switch
          trackColor={{
            false: Styles.Colors.darkGrayBg,
            true: Styles.Colors.success,
          }}
          thumbColor={Styles.Colors.white}
          ios_backgroundColor={Styles.Colors.darkGrayBg}
          onValueChange={setDarkModeEnabled}
          value={darkModeEnabled}
        />
      </View>
    );
  };

  const renderAnonMode = () => {
    return (
      <View style={styles.switch}>
        <Text style={styles.switchText}>Anonymous Mode</Text>
        <Switch
          trackColor={{
            false: Styles.Colors.darkGrayBg,
            true: Styles.Colors.success,
          }}
          thumbColor={Styles.Colors.white}
          ios_backgroundColor={Styles.Colors.darkGrayBg}
          onValueChange={anonModeToggle}
          value={chatForbiden}
        />
      </View>
    );
  };

  const renderAllowMessaging = () => {
    return (
      <View style={styles.switch}>
        <Text style={styles.switchText}>Allow Messaging</Text>
        <Switch
          trackColor={{
            false: Styles.Colors.darkGrayBg,
            true: Styles.Colors.success,
          }}
          thumbColor={Styles.Colors.white}
          ios_backgroundColor={Styles.Colors.darkGrayBg}
          onValueChange={setAllowMsgEnabled}
          value={allowMsgEnabled}
        />
      </View>
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.switches}>
        {renderDarkMode()}
        {renderAnonMode()}
        {renderAllowMessaging()}
      </View>
      <SubmitButton
        onPress={alertDeleteUser}
        title="Delete My Account"
        style={styles.button}
        titleStyle={styles.btnTitle}
      />
    </View>
  );
};

export default Preferences;
