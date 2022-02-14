import React from 'react';
import {View, Text, FlatList} from 'react-native';

import {VerticalBar} from '@components';
import {Styles} from '@common';

import styles from './styles';

import data from './data';

const Expenses = () => {
  const renderBars = () => {
    return (
      <View style={styles.barContainer}>
        {data.map(item => {
          return (
            <VerticalBar
              key={item.id}
              barHeight={item.percent}
              innerColor={
                item.blue
                  ? Styles.Colors.primaryBlue
                  : Styles.Colors.pinkFuschia
              }
              name={item.name}
            />
          );
        })}
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
      {renderBars()}
      <Text style={styles.title}>Expenses</Text>
      {renderList()}
    </View>
  );
};

export default Expenses;
