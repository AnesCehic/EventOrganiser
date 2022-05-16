import React, {useState} from 'react';
import {View} from 'react-native';

import {TextInput, SubmitButton, LoadingIndicator} from '@components';
import {toast} from '@utils';
import {MessageGroupsService} from '@services/apiClient';

import styles from './styles';

const ChangeGroupName = ({navigation, route}) => {
  const groupId = route?.params?.groupId;

  const [isLoading, setIsLoading] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      /*  Do your stuff here  */

      const res = await MessageGroupsService.patch(groupId, {
        label: newGroupName,
      });

      console.log(res);

      setIsLoading(false);
      toast('success', 'Success', 'Group name changed successfully!');
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
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <TextInput
          placeholder="Enter new group name"
          onChangeText={setNewGroupName}
          value={newGroupName}
        />
        <SubmitButton
          style={styles.btnStyle}
          titleStyle={styles.btnTitleStyle}
          onPress={handleSubmit}
          title="Update group name"
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default ChangeGroupName;
