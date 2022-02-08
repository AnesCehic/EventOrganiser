import React from "react";
import { TextInput } from "react-native";

import styles from './styles';

const SearchInput = () => {
  return (
    <TextInput
      placeholder='Search'
      style={styles.searchContainer}
    />
  )
};

export default SearchInput;
