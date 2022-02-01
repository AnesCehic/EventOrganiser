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
          <Icon name="arrow-back" size={30} />
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
            <Icon name="search" size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="more-vert" size={30} />
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
