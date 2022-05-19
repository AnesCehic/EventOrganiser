import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Styles} from '@common';

const MainIcon = (item, userData, navigation) => {
  const redirectToChangeGroupName = () => {
    navigation.navigate('ChangeGroupName', {
      groupId: item._id,
    });
  };

  let image;
  let component = null;
  let componentHeader = null;
  if (item.type === 0) {
    image = item.participantList.find(e => e._id !== userData._id);
    if (image.upload?.files[0]?.signedURL) {
      image = image.upload?.files[0]?.signedURL;
      component = (
        <Avatar
          size={Styles.Sizes.avatarMedium}
          rounded
          source={{
            uri: image,
          }}
        />
      );
      componentHeader = (
        <Avatar
          size={Styles.Sizes.avatarSmall}
          rounded
          source={{
            uri: image,
          }}
          onPress={redirectToChangeGroupName}
        />
      );
    } else {
      let name = image.firstName[0] + image.lastName[0];
      component = (
        <View
          style={[
            styles.userImageFallback,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={{fontSize: 25}}>{name}</Text>
        </View>
      );
      componentHeader = (
        <TouchableOpacity
          onPress={redirectToChangeGroupName}
          style={[
            styles.userImageFallback,
            {
              justifyContent: 'center',
              alignItems: 'center',
              width: 32,
              height: 32,
            },
          ]}>
          <Text>{name}</Text>
        </TouchableOpacity>
      );
    }
  } else {
    component = (
      <View
        style={[
          styles.userImageFallback,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <MaterialIcons name="groups" size={30} />
      </View>
    );
    componentHeader = (
      <TouchableOpacity
        onPress={redirectToChangeGroupName}
        style={[
          styles.userImageFallback,
          {
            justifyContent: 'center',
            alignItems: 'center',
            width: 32,
            height: 32,
          },
        ]}>
        <MaterialIcons name="groups" size={25} />
      </TouchableOpacity>
    );
  }

  return {
    component,
    componentHeader,
  };
};

const styles = StyleSheet.create({
  userImageFallback: {
    backgroundColor: Styles.Colors.gray,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  textSize: {
    fontSize: 25,
  },
});

export default MainIcon;
