import React, {useRef, useEffect} from 'react';
import {View, Text, Animated, Easing} from 'react-native';
import styles from './styles';

const VerticalBar = ({innerColor, barHeight, name}) => {
  const height = useRef(new Animated.Value(0)).current;
  const fullHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${barHeight}%`],
  });

  useEffect(() => {
    Animated.timing(height, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Animated.View
          style={[
            styles.innerContainer,
            {
              backgroundColor: innerColor || 'transparent',
              height: fullHeight || 0,
            },
          ]}
        />
      </View>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default VerticalBar;
