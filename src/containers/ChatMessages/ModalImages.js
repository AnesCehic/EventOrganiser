import React from 'react';
import {View, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

import {Styles} from '@common';

const ModalImage = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={modalVisible.isVisible}
      backdropColor="#141C24"
      backdropOpacity={1}
      style={{margin: 0}}>
      <SafeAreaView>
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
      </SafeAreaView>
    </Modal>
  );
};

export default ModalImage;
