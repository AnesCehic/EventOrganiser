import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';

import {BottomSheetModal, SubmitButton} from '@components';
import TextInput from '@components/TextInput';
import {Styles} from '@common';

import DateAndPlace from './DateAndPlace';

import styles from './styles';

const FeedDetails = () => {
  const [isRSVPModalVisible, setIsRSVPModalVisible] = useState(false);
  const [isConfirmRSVPModalVisible, setIsConfirmRSVPModalVisible] =
    useState(false);

  const toggleRSVPModal = () => {
    setIsRSVPModalVisible(!isRSVPModalVisible);
  };

  const renderRSVPModal = () => {
    return (
      <BottomSheetModal
        isVisible={isRSVPModalVisible}
        title="RSVP"
        closeModal={() => setIsRSVPModalVisible(false)}
        contentContainerStyle={styles.modalContainer}>
        <TextInput
          placeholder="Dietary Restrictions & notes..."
          style={styles.modalTextAraea}
          multiline={true}
        />
        <TextInput placeholder="Guests" style={styles.modalTextInput} />
        <SubmitButton
          style={styles.modalConfirmBtn}
          title="CONFIRM"
          onPress={() => {
            setIsRSVPModalVisible(false);
            // change this with async when api is set
            setTimeout(() => {
              setIsConfirmRSVPModalVisible(true);
            }, 400);
          }}
        />
      </BottomSheetModal>
    );
  };
  // checkcircle;
  const renderConfirmedRSVPModal = () => {
    if (!isRSVPModalVisible) {
      return (
        <BottomSheetModal
          isVisible={isConfirmRSVPModalVisible}
          title="Reservation Confirmed!"
          closeModal={() => setIsConfirmRSVPModalVisible(false)}
          contentContainerStyle={styles.modalContainer}>
          <Icon
            style={styles.modalIcon}
            name="checkcircle"
            type="antdesign"
            color={Styles.Colors.success}
            size={70}
          />

          <SubmitButton
            style={styles.modalConfirmBtn}
            title="ADD TO CALENDAR"
            onPress={() => setIsConfirmRSVPModalVisible(false)}
          />
          <SubmitButton
            style={[
              styles.modalConfirmBtn,
              {backgroundColor: Styles.Colors.grayBorder},
            ]}
            // eslint-disable-next-line react-native/no-inline-styles
            titleStyle={{color: '#5D6470'}}
            title="UPDATE RSVP INFO"
            onPress={() => console.log('UPDATE RSVP INFO')}
          />
        </BottomSheetModal>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./image.png')} />

      <View style={styles.dateAndLocationWithInfo}>
        <DateAndPlace icon="calendar-today" text="January, 28th 2022" />
        <DateAndPlace icon="location-pin" text="Test" />
      </View>

      <View style={styles.rsvpContainer}>
        <TouchableOpacity style={styles.rsvpButton} onPress={toggleRSVPModal}>
          <Text style={styles.rsvpText}>RSVP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateAndLocationWithInfo}>
        <Text style={styles.header}>Description</Text>
      </View>

      {renderRSVPModal()}
      {renderConfirmedRSVPModal()}
    </View>
  );
};

export default FeedDetails;
