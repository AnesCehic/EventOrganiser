import React, {useState} from 'react';
import {useColorScheme, View} from 'react-native';

import {TextInput, SubmitButton, LoadingIndicator} from '@components';
import {toast} from '@utils';
import {Styles} from '@common';
import {MessageGroupsService} from '@services/apiClient';

import styles from './styles';

const ChangeGroupName = ({navigation, route}) => {
  const groupId = route?.params?.groupId;

  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      /*  Do your stuff here  */

      const res = await MessageGroupsService.patch(groupId, {
        label: newGroupName,
      });

      setIsLoading(false);
      toast('success', 'Success', 'Group name changed successfully!');
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      toast('error', 'Error', error.message);
      console.log('[Error change group name]', error);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' && {backgroundColor: '#0A121A'},
      ]}>
      <View style={styles.contentWrapper}>
        <TextInput
          style={
            colorScheme === 'dark' && {
              backgroundColor: '#273038',
              borderWidth: 0,
              color: Styles.Colors.white,
            }
          }
          placeholderTextColor={colorScheme === 'dark' && Styles.Colors.white}
          placeholder="Enter new group name"
          onChangeText={setNewGroupName}
          value={newGroupName}
        />
        <SubmitButton
          style={[
            styles.btnStyle,
            colorScheme === 'dark' && {backgroundColor: '#273038'},
          ]}
          titleStyle={[
            styles.btnTitleStyle,
            colorScheme === 'dark' && {backgroundColor: '#273038'},
          ]}
          onPress={handleSubmit}
          title="Update group name"
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default ChangeGroupName;
