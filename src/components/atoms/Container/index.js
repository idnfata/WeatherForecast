import React from 'react';
import {StyleSheet, View} from 'react-native';
import NoConnection from '../NoConnection';

const Container = ({children}) => {
  return (
    <View style={styles.container}>
      <NoConnection />
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
