import React, {useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';

import {bgImage, IconBack, IconLogout, IconTask} from '../../assets';
import {useDispatch} from 'react-redux';
import {logoutUser, onClickLogout} from '../redux/action';

const DrawerContent = props => {
  const dispatch = useDispatch();

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground
        source={bgImage}
        style={{
          width: undefined,
          padding: 16,
          paddingTop: 48,
        }}>
        <Image
          source={{uri: 'https://picsum.photos/200/300'}}
          style={styles.profile}
        />
        <Text style={styles.name}>Weather Forecast</Text>
        <View style={{flexDirection: 'row'}}>
          <IconTask width="16" height="16" fill="white" />
          <Text style={styles.position}>Tugas Dari Mas Bryant</Text>
        </View>
      </ImageBackground>
      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Log out"
          onPress={() => dispatch(onClickLogout())}
          icon={({focused, color, size}) => (
            <IconLogout fill={color} width={size} height={size} />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#fff',
  },
  name: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 8,
  },
  position: {
    color: 'rgba(255,255,255, 0.8)',
    fontSize: 13,
    marginLeft: 5,
    marginTop: -1,
  },
  drawerContent: {
    flex: 1,
  },

  bottomDrawerSection: {
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    paddingTop: 15,
    marginBottom: 10,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
