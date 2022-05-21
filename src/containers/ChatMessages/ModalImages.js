import React from 'react';
import {View, TouchableOpacity, Image, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {Styles} from '@common';

const ModalImage = ({modalVisible, setModalVisible}) => {
  return (
    <View>
      <Modal animationType="slide" visible={modalVisible.isVisible}>
        <View>
          <View style={{backgroundColor: Styles.Colors.gold}}>
            <Image
              source={{uri: modalVisible.image}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
              }}
              onPress={() =>
                setModalVisible({
                  isVisible: !modalVisible.isVisible,
                })
              }>
              <Icon name="close" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalImage;
