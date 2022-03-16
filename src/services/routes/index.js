import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home, Search, Setting, Splash} from '../../pages';
import {colors, darkTheme, lightTheme} from '../../utils';
import {
  StackAuthScreen,
  StackHomeScreen,
  StackSearchScreen,
  StackSettingsScreen,
} from './stack';
import {BottomTabs} from './bottom-tabs';
import DrawerContent from './drawer-contents';
import {
  IconHistory,
  IconHome,
  IconLate,
  IconOvertime,
  IconPaySlip,
  IconSearch,
  IconSetting,
  IconUser,
} from '../../assets';
import {Alert, Dimensions, useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTheme, switchTheme} from '../redux/action';

//Component Stack taruh di tab (menu bawah)
//Component Tab taruh di drawer
const Drawer = createDrawerNavigator();

const Router = () => {
  const initialState = useSelector(reducer => reducer.GlobalReducer);
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();

  useEffect(() => {
    getTheme().then(value => {
      // console.log(value);
      switch (value) {
        case 'light':
          dispatch(switchTheme(lightTheme));
          break;
        case 'dark':
          dispatch(switchTheme(darkTheme));
          break;
        default:
          dispatch(switchTheme(lightTheme));
          break;
      }
    });
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}
      drawerContentOptions={{
        itemStyle: {
          marginHorizontal: 0,
          marginVertical: 0,
          borderRadius: 0,
          paddingHorizontal: 15,
        },
        activeTintColor: colors.default,
      }}
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
      drawerStyle={{
        width: Dimensions.get('window').width * 0.75,
      }}>
      <Drawer.Screen
        name="Home"
        component={BottomTabs}
        options={{
          drawerIcon: ({color, size}) => (
            <IconHome height={size} width={size} fill={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Search"
        component={StackSearchScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <IconSearch height={size} width={size} fill={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={StackSettingsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <IconSetting height={size} width={size} fill={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Router;
