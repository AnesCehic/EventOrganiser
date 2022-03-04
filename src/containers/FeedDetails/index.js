import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import RenderHTML from 'react-native-render-html';
import dayjs from 'dayjs';

import {BottomSheetModal, SubmitButton, LoadingIndicator} from '@components';
import TextInput from '@components/TextInput';
import {Styles} from '@common';

import {EventService} from '../../services/apiClient';

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

  const toggleRSVPModal = () => {
    setIsRSVPModalVisible(!isRSVPModalVisible);
  };

  const fetchEventData = async () => {
    try {
      setIsLoading(true);
      const res = await EventService.get(route.params.id);
      console.log(res);
      setEventData({
        ...res,
        start: dayjs(eventData.start).format('MMMM DD'),
        end: dayjs(eventData.end).format('MMMM DD'),
        startTime: dayjs(eventData.start).format('hh mm a'),
        endTime: dayjs(eventData.end).format('hh mm a'),
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('[Error fetching data for event]', error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

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

  const renderRSVP = () => {
    if (eventData.canRSVP) {
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
            // uri: 'https://api.lincolnclub.app/uploads/render/621ddd344e61f846fa5df354',
            uri: 'https://picsum.photos/200/300',
            method: 'GET',
            headers: {
              Pragma: 'no-cache',
              Authoriztion:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyIsInR5cGUiOiJhY2Nlc3MifQ.eyJpYXQiOjE2NDYxMTk0MjIsImV4cCI6MTY0NjIwNTgyMiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjIxODIyMWU2YTQ5ZjcwMjExNTlhNDM1IiwianRpIjoiYTJiMDdhZmYtYmYyYy00ZTc1LTk1ZDctNTFjMzQ0NGI0ZmRiIn0.gPyohltMSuKO01svr5v4WVECt8Q8U5WqAqYMHeXo8CI',
            },
          }}
        />

        <View style={styles.scrollViewContentStyle}>
          <View>
            <Text style={styles.header}>{eventData.title}</Text>
          </View>
          <View style={styles.dateAndLocationWithInfo}>
            <DateAndPlace
              icon="calendar-today"
              text1={`${eventData.start} - ${eventData.end}`}
              text2={`${eventData.startTime}, ${eventData.endTime}`}
              bold
            />
            <DateAndPlace
              icon="location-pin"
              text1={location1}
              text2={location2}
            />
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
