import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Header as HeaderRNE, Icon, Text} from 'react-native-elements';

import styles from './styles';

const Header = ({goBack, backgroundColor, bar}) => {
  const barStyle = bar || 'default';
  return (
    <HeaderRNE
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      leftComponent={
        <TouchableOpacity onPress={goBack}>
          <Text h4 style={styles.leftText}>
            LeftTest
          </Text>
        </TouchableOpacity>
      }
      centerComponent={
        <View style={styles.headerCenter}>
          <Text h4 style={styles.centerText}>
            Center Test
          </Text>
        </View>
      }
      rightComponent={
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Text h4>Right Test</Text>
          </TouchableOpacity>
        </View>
      }
      leftContainerStyle={styles.headerLeftContainer}
      centerContainerStyle={styles.headerCenterContainer}
      rightContainerStyle={styles.headerRightContainer}
      placement="left"
    />
  );
};

export default Header;
