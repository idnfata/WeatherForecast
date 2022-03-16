import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackSettingsScreen, StackHomeScreen, StackSearchScreen} from './stack';
import {IconHome, IconSearch, IconSetting} from '../../assets';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
//tampilkan bottom tabs di component berikut ini:

export function BottomTabs() {
  const initialState = useSelector(reducer => reducer.GlobalReducer);
  const {theme} = initialState;
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: theme.secondaryBackgroundColor,
          borderRadius: 15,
          height: 90,
          borderTopColor: 'transparent',
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={StackHomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <IconHome
                width={25}
                height={25}
                fill={focused ? theme.activeIconColor : theme.iconColor}
              />
              <Text
                style={{
                  color: focused ? theme.textFocused : theme.textColor,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={StackSearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <IconSearch
                width={25}
                height={25}
                fill={focused ? theme.activeIconColor : theme.iconColor}
              />
              <Text
                style={{
                  color: focused ? theme.textFocused : theme.textColor,
                }}>
                Search
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={StackSettingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <IconSetting
                width={25}
                height={25}
                fill={focused ? theme.activeIconColor : theme.iconColor}
              />
              <Text
                style={{
                  color: focused ? theme.textFocused : theme.textColor,
                }}>
                Setting
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
