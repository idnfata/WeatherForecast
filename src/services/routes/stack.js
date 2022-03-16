import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {
  IconBack,
  IconEditUser,
  IconMenu,
  IconMenuWhite,
  IconNotif,
} from '../../assets';
import {Home, NextDaysForecast, Search, Setting, Splash} from '../../pages';
import {colors} from '../../utils';
import {useSelector} from 'react-redux';

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const SettingsStack = createStackNavigator();

export const StackHomeScreen = ({navigation}) => {
  const {theme} = useSelector(reducer => reducer.GlobalReducer);
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.backgroundColor,
          shadowColor: 'transparent',
        },
        headerTintColor: theme.textColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Weather Forecast',

          headerTitleStyle: {
            textAlign: 'center',
            flex: 1,
            backgroundColor: theme.backgroundColor,
            fontSize: 17,
            marginRight: 50,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              {theme.mode === 'light' ? (
                <IconMenu width="25" height="25" style={{marginLeft: 20}} />
              ) : (
                <IconMenuWhite
                  width="25"
                  height="25"
                  style={{marginLeft: 20}}
                />
              )}
            </TouchableOpacity>
          ),
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigation.navigate('Notifications')}>
          //     <IconNotif
          //       width="25"
          //       height="25"
          //       fill="white"
          //       style={{marginRight: 10}}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <HomeStack.Screen
        name="NextDaysForecast"
        component={NextDaysForecast}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
export const StackSettingsScreen = ({navigation}) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SettingsStack.Screen
        name="Settings"
        component={Setting}
        options={{
          title: 'Setting',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            // textAlign: 'center',
            flex: 1,
            color: colors.light,
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerStyle: {
            shadowColor: 'transparent',
            backgroundColor: colors.default,
          },
        }}
      />
    </SettingsStack.Navigator>
  );
};

export const StackSearchScreen = ({navigation}) => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      }}>
      <SearchStack.Screen name="Search" component={Search} />
    </SearchStack.Navigator>
  );
};
