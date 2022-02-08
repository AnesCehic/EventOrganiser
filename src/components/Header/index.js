import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Header as HeaderRNE, Icon} from 'react-native-elements';

import {HeaderTitleText, HeaderBackButton} from './HeaderItems';

import styles from './styles';

const Header = ({goBack, backgroundColor, bar, title, leftIcon}) => {
  const barStyle = bar || 'default';
  return (
    <HeaderRNE
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      leftComponent={<HeaderBackButton onPress={goBack} icon={leftIcon} />}
      centerComponent={<HeaderTitleText title={title} />}
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
    />
  );
};

export default Header;
