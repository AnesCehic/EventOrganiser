import React, {useState, useEffect} from 'react';
import {View, Text, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SubmitButton} from '@components';

import {Styles} from '@common';

import styles from './styles';

const Preferences = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [anonModeEnabled, setAnonModeEnabled] = useState(false);
  const [allowMsgEnabled, setAllowMsgEnabled] = useState(true);

  useEffect(() => {
    getAnonMode();
  }, []);

  const getAnonMode = async () => {
    try {
      const value = await AsyncStorage.getItem('@anonymousMode');
      const isAnonMode = value === 'enabled';
      setAnonModeEnabled(isAnonMode);
    } catch (error) {
      console.log('[Error get anon mode - preferences]', error);
    }
  };

  const anonModeToggle = async value => {
    try {
      const anonymousMode = value ? 'enabled' : 'disabled';
      await AsyncStorage.setItem('@anonymousMode', anonymousMode);
      setAnonModeEnabled(value);
    } catch (error) {
      console.log('[Error set switch anon mode]', error);
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
          value={anonModeEnabled}
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

  return (
    <View style={styles.container}>
      <View style={styles.switches}>
        {renderDarkMode()}
        {renderAnonMode()}
        {renderAllowMessaging()}
      </View>
      <SubmitButton
        onPress={() => console.log('deactivate account')}
        title="Delete My Account"
        style={styles.button}
        titleStyle={styles.btnTitle}
      />
    </View>
  );
};

export default Preferences;
