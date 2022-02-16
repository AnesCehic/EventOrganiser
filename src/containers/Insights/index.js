import React from 'react';
import {View, Text, FlatList} from 'react-native';

import {CircleProgress} from '@components';
import {Styles} from '@common';

import styles from './styles';

import data from './data';

const Insights = () => {
  const renderCircle = () => {
    return (
      <View style={styles.circleContainer}>
        <CircleProgress
          percent={70}
          mainValue={'$20.01'}
          bottomValue={'70% spent'}
        />
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.barContainerleftListItemContainer}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor: item.blue
                  ? Styles.Colors.primaryBlue
                  : Styles.Colors.pinkFuschia,
              },
            ]}
          />
          <Text>{item.name}</Text>
        </View>
        <Text>{item.percent}%</Text>
      </View>
    );
  };

  const renderList = () => {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.expensesList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderCircle()}
      <Text style={styles.title}>Expenses</Text>
      {renderList()}
    </View>
  );
};

export default Insights;
