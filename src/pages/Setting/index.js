import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  IconAbout,
  IconDarkMode,
  IconGlobal,
  IconKey,
  IconManualBook,
  IconNotif,
  IconPassword,
  IconRightArrow,
} from '../../assets';
import {onClickLogout, switchTheme} from '../../services';
import {colors, darkTheme, lightTheme} from '../../utils';

const Setting = ({navigation, route}) => {
  const initialState = useSelector(reducer => reducer.GlobalReducer);
  const dispatch = useDispatch();
  // const [userInfo, setUserInfo] = useState({})
  // const [theme, setCTheme] = useState({})
  const {userInfo, theme} = initialState;
  // const userInfo = useMemo(
  //   () => initialState.userInfo,
  //   [initialState.userInfo],
  // );
  // const theme = useMemo(() => initialState.theme, [initialState.theme]);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={theme.statusBarStyle} />

      <View
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <View
          style={[styles.section, {backgroundColor: theme.backgroundColor}]}>
          <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
            <View
              style={[
                styles.profileContainer,
                {
                  backgroundColor: theme.backgroundColor,
                  borderBottomColor: theme.secondaryBackgroundColor,
                },
              ]}>
              <Image
                source={{
                  uri: 'https://picsum.photos/200/300',
                }}
                style={[
                  styles.avatar,
                  {
                    borderColor: theme.secondaryTextColor,
                  },
                ]}
              />
              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, {color: theme.textColor}]}>
                  {userInfo.name}
                </Text>
                <Text
                  style={[
                    styles.profileEmail,
                    {color: theme.secondaryTextColor},
                  ]}>
                  {userInfo.email}
                </Text>
              </View>
              <IconRightArrow
                width={23}
                height={23}
                fill={theme.secondaryTextColor}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
            style={[
              styles.menuItem,
              {
                borderBottomColor: theme.secondaryTextColor,
              },
            ]}>
            <IconPassword width={25} height={25} fill={theme.iconColor} />

            <Text
              style={[
                styles.menuItemText,
                {
                  color: theme.textColor,
                },
              ]}>
              Ganti Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
            style={[
              styles.menuItem,
              {
                borderBottomColor: theme.secondaryTextColor,
              },
            ]}>
            <IconKey width={20} height={20} fill={theme.iconColor} />

            <Text
              style={[
                styles.menuItemText,
                {
                  color: theme.textColor,
                },
              ]}>
              Ganti PIN
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.textColor,
              },
            ]}>
            Aplikasi
          </Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Notifikasi', 'Notifikasi default tidak bisa diubah')
            }
            style={[
              styles.menuItem,
              {
                borderBottomColor: theme.secondaryTextColor,
              },
            ]}>
            <IconNotif width={25} height={25} fill={theme.iconColor} />

            <Text
              style={[
                styles.menuItemText,
                {
                  color: theme.textColor,
                },
              ]}>
              Notifikasi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Alert.alert('Bahasa', 'Bahasa default tidak bisa diubah')
            }
            style={[
              styles.menuItem,
              {
                borderBottomColor: theme.secondaryTextColor,
              },
            ]}>
            <IconGlobal width={22} height={22} fill={theme.iconColor} />

            <Text
              style={[
                styles.menuItemText,
                {
                  color: theme.textColor,
                },
              ]}>
              Bahasa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.appearanceMenu}>
            <View
              style={[
                styles.menuItem,
                {
                  borderBottomColor: theme.secondaryTextColor,
                  flex: 1,
                },
              ]}>
              <IconDarkMode width={25} height={25} fill={theme.iconColor} />
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: theme.textColor,
                  },
                ]}>
                Tampilan
              </Text>
            </View>
            <View
              style={[
                styles.toggleAppearance,
                {
                  borderColor: theme.secondaryTextColor,
                },
              ]}>
              <Text
                style={{
                  fontSize: 10,
                  color: theme.textColor,
                }}>
                {theme.mode === 'light' ? 'Terang' : 'Gelap'}
              </Text>
              <Switch
                value={theme.mode === 'light' ? false : true}
                onValueChange={() =>
                  theme.mode === 'light'
                    ? dispatch(switchTheme(darkTheme))
                    : dispatch(switchTheme(lightTheme))
                }
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.textColor,
              },
            ]}>
            Lainnya
          </Text>
          <TouchableOpacity
            onPress={() => Alert.alert('PBKM Mobile', 'Versi 0.1')}
            style={[
              styles.menuItem,
              {
                borderBottomColor: theme.secondaryTextColor,
              },
            ]}>
            <IconAbout width={22} height={22} fill={theme.iconColor} />

            <Text
              style={[
                styles.menuItemText,
                {
                  color: theme.textColor,
                },
              ]}>
              Tentang
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Hubungi Admin',
                'Untuk meminta link buku petunjuk penggunaan',
              )
            }
            style={[
              styles.menuItem,
              {
                borderBottomColor: theme.secondaryTextColor,
              },
            ]}>
            <IconManualBook width={22} height={22} fill={theme.iconColor} />

            <Text
              style={[
                styles.menuItemText,
                {
                  color: theme.textColor,
                },
              ]}>
              Panduan Penggunaan
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.appVersion}>
          <Text style={[styles.textAppVersion, {color: theme.textColor}]}>
            WeatherForecast
          </Text>
          <Text style={[styles.numberAppVersion, {color: theme.textColor}]}>
            Versi 0.1
          </Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(onClickLogout())}>
          <Text style={styles.logoutButton}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 20,
    height: 100,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 75,
    borderWidth: 3,
  },
  profileInfo: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
  },
  profileName: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '100',
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    paddingBottom: 3,
    paddingTop: 15,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  appearanceMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleAppearance: {
    flexDirection: 'row',
    marginRight: 20,
    marginLeft: -15,
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  appVersion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  textAppVersion: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 12,
  },
  numberAppVersion: {
    color: colors.dark,
    fontSize: 12,
  },
  logoutButton: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'red',
    fontWeight: 'bold',
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'red',
  },

  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    marginHorizontal: 15,
  },
  menuItemText: {
    marginLeft: 15,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 26,
  },
});
