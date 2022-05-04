import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
      {Platform.OS === 'android' ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={[
              styles.contentContainer,
              {paddingBottom: insets.bottom},
              contentContainerStyle,
            ]}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {children}
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <KeyboardAwareScrollView
          enableOnAndroid={false}
          extraScrollHeight={70}
          contentContainerStyle={[
            styles.contentContainer,
            {paddingBottom: insets.bottom},
            contentContainerStyle,
          ]}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {children}
        </KeyboardAwareScrollView>
      )}
    </Modal>
  );
};

export default BottomSheetModal;
