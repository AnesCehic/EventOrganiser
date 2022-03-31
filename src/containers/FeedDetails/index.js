import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import * as AddToCalendarEvent from 'react-native-add-calendar-event';
import RenderHTML from 'react-native-render-html';
import dayjs from 'dayjs';

import {BottomSheetModal, SubmitButton, LoadingIndicator} from '@components';
import TextInput from '@components/TextInput';
import {Styles} from '@common';
import {toast} from '@utils';

import {EventService, RSVPService} from '../../services/apiClient';

import DateAndPlace from './DateAndPlace';

import styles from './styles';

const FeedDetails = ({navigation, route}) => {
  const [eventData, setEventData] = useState({
    title: 'Test',
    description: 'Description',
    location: 'Location',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRSVPModalVisible, setIsRSVPModalVisible] = useState(false);
  const [isConfirmRSVPModalVisible, setIsConfirmRSVPModalVisible] =
    useState(false);
  const [note, setNote] = useState('');

  const toggleRSVPModal = () => {
    setIsRSVPModalVisible(!isRSVPModalVisible);
  };

  const fetchEventData = async () => {
    try {
      setIsLoading(true);
      const res = await EventService.get(route.params.id);

      let image = res.upload.files[0].signedURL;
      setEventData({
        ...res,
        startDay: dayjs(res.start).format('MMMM DD'),
        endDay: dayjs(res.end).format('MMMM DD'),
        startTime: dayjs(res.start).format('hh:mm a'),
        endTime: dayjs(res.end).format('hh:mm a'),
        eventImage: image,
      });
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error fetching data for event]', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openMap = async address => {
    const destination = encodeURIComponent(address);
    const provider = Platform.OS === 'ios' ? 'apple' : 'google';
    const link = `http://maps.${provider}.com/?daddr=${destination}`;

    try {
      await Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const setNoteText = text => {
    setNote(text);
  };

  const renderModalEventDetails = () => {
    return (
      <View style={styles.rsvpInfo}>
        <Text style={{fontSize: 16, marginBottom: 8}}>Event details</Text>
        <Text style={{fontSize: 18, fontWeight: '800', marginBottom: 20}}>
          {eventData.title}
        </Text>
        {/* {renderDateAndPlace()}
        {renderDateAndPlaceLocation()} */}
      </View>
    );
  };

  const addEventToCalendar = () => {
    AddToCalendarEvent.presentEventCreatingDialog({
      title: eventData.title,
      location: eventData.location,
    })
      .then(eventInfo => {
        console.log(eventInfo);
      })
      .catch(err => {
        console.log('[Error adding calendar to event]', err);
      });
    setIsConfirmRSVPModalVisible(false);
  };

  const renderRSVPModal = () => {
    const screenWidth = Dimensions.get('screen').width;

    return (
      <BottomSheetModal
        isVisible={isRSVPModalVisible}
        title="RSVP Now"
        closeModal={() => setIsRSVPModalVisible(false)}
        contentContainerStyle={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsRSVPModalVisible(false)}>
          <Text>X</Text>
        </TouchableOpacity>
        {renderModalEventDetails()}
        <View
          style={{
            width: screenWidth,
            backgroundColor: '#E6EBF0',
            height: 1,
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            marginBottom: 8,
            width: '100%',
            textAlign: 'left',
          }}>
          Enter any special dietary restrictions
        </Text>
        <TextInput
          placeholder="Dietary Restrictions & notes..."
          style={styles.modalTextAraea}
          multiline={true}
          value={note}
          onChangeText={setNoteText}
        />
        <TextInput placeholder="Guests" style={styles.modalTextInput} />
        <SubmitButton
          style={styles.modalConfirmBtn}
          title="Confirm reservation"
          onPress={async () => {
            try {
              const res = await RSVPService.create({
                eventId: route.params.id,
                notes: note,
              });
            } catch (error) {
              console.log('[Error posting rsvp field]', error);
            } finally {
              setIsRSVPModalVisible(false);
              // change this with async when api is set
              setTimeout(() => {
                setIsConfirmRSVPModalVisible(true);
              }, 400);
            }
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
          contentContainerStyle={[
            styles.modalContainer,
            {justifyContent: 'space-between'},
          ]}>
          <Icon
            style={styles.modalIcon}
            name="checkcircle"
            type="antdesign"
            color={Styles.Colors.success}
            size={70}
          />

          {renderModalEventDetails()}

          <View style={{width: '100%'}}>
            <SubmitButton
              style={[styles.modalConfirmBtn, {marginBottom: 0}]}
              title="Add to calendar"
              onPress={addEventToCalendar}
            />
            <SubmitButton
              style={[
                styles.modalConfirmBtn,
                {backgroundColor: Styles.Colors.grayBorder},
              ]}
              // eslint-disable-next-line react-native/no-inline-styles
              titleStyle={{color: '#5D6470'}}
              title="Update reservation"
              onPress={() => console.log('UPDATE RSVP INFO')}
            />
          </View>
        </BottomSheetModal>
      );
    }
  };

  const renderDateAndPlace = () => {
    return (
      <DateAndPlace
        icon="calendar-today"
        text1={`${eventData.startDay} - ${eventData.endDay}`}
        text2={`${eventData.startTime} - ${eventData.endTime}`}
        bold
      />
    );
  };

  const renderDateAndPlaceLocation = () => {
    return (
      <DateAndPlace icon="location-pin" text1={location1} text2={location2} />
    );
  };

  const renderRSVP = () => {
    if (!eventData.canRSVP) {
      return null;
    }

    return (
      <View style={styles.rsvpContainer}>
        <View>
          <Text style={styles.joinText}>Want to join?</Text>
          <Text>Seats still available</Text>
        </View>
        <TouchableOpacity style={styles.rsvpButton} onPress={toggleRSVPModal}>
          <Text style={styles.rsvpText}>RSVP Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const location1 = eventData.location.split(',')[0];
  const location2 = eventData.location.split(',').slice(1).join('');
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Image
          style={styles.image}
          source={{
            uri: eventData?.upload?.files[0]?.signedURL,
          }}
        />

        <View style={styles.scrollViewContentStyle}>
          <View>
            <Text style={styles.header}>{eventData.title}</Text>
          </View>
          <View style={styles.dateAndLocationWithInfo}>
            {renderDateAndPlace()}
            <TouchableOpacity
              onPress={() => {
                openMap(eventData.location);
              }}>
              {renderDateAndPlaceLocation()}
            </TouchableOpacity>
          </View>
          <RenderHTML
            source={{
              html: eventData.description,
            }}
            contentWidth={500}
          />
        </View>
      </ScrollView>

      {renderRSVP()}

      {renderRSVPModal()}
      {renderConfirmedRSVPModal()}
    </View>
  );
};

export default FeedDetails;
