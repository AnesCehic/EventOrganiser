import React from 'react';
import {TextInput} from 'react-native';

import styles from './styles';

const SearchInput = ({placeholder = 'Search', style}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.searchContainer, style]}
    />
  );
};

export default SearchInput;
