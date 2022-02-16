import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import styles from './styles';

const BottomSheetModal = ({
  children,
  title,
  isVisible,
  closeModal,
  containerStyle,
  contentContainerStyle,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      isVisible={isVisible}
      hideModalContentWhileAnimating={true}
      style={[styles.container, containerStyle]}
      backdropColor="#0000001c"
      onBackdropPress={closeModal}>
      <View
        style={[
          styles.contentContainer,
          {paddingBottom: insets.bottom},
          contentContainerStyle,
        ]}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {children}
      </View>
    </Modal>
  );
};

export default BottomSheetModal;
