import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
  PermissionsAndroid,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import RNLocation from 'react-native-location';
import {useDispatch, useSelector} from 'react-redux';
import {
  IconClear,
  IconClouds,
  IconHero,
  IconOutdoor,
  IconRain,
  IconRightArrow,
  IconSky,
} from '../../assets';
import {Container} from '../../components';
import {getCityName, getCurrentAndForecastWeather} from '../../services';
import {isArraySame, hourAMPMFormat} from '../../utils/helpers';
const {width} = Dimensions.get('window');
const DEFAULT_LATITUDE = -3.0033866751551415;
const DEFAULT_LONGITUDE = 114.77837831343327;
const date = new Date();
const today = new Date();
let yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const Home = ({navigation}) => {
  const initialState = useSelector(reducer => reducer.GlobalReducer);

  const [location, setLocation] = useState({
    long: DEFAULT_LONGITUDE,
    lat: DEFAULT_LATITUDE,
    last_update: 0,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);
  const [isTodayOrYesterday, setIsTodayOrYesterday] = useState('today');
  const [weatherForecast, setWeatherForecast] = useState({
    lat: DEFAULT_LATITUDE,
    lon: DEFAULT_LONGITUDE,
    timezone: 'Asia/Makassar',
    timezone_offset: 28800,
    current: {},
    hourly: [],
    daily: [],
  });
  const timeNow = today.getHours();
  const [cityName, setCityName] = useState({
    city: '',
    province: '',
  });

  const handleChangeDay = val => {
    setIsTodayOrYesterday(val);
  };

  const GetLocation = async () => {
    try {
      const locationpermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'We need access to your location ' +
            'so you can get live quality updates.',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      // console.log('location permission: ', locationpermission);
      // console.log('harusnya : ', PermissionsAndroid.RESULTS.GRANTED);
      if (locationpermission === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('permission granted');
        RNLocation.configure({
          distanceFilter: 0, // Meters
          desiredAccuracy: {
            ios: 'best',
            android: 'highAccuracy',
          },
          // Android only
          androidProvider: 'auto',
          interval: 5000, // Milliseconds
          fastestInterval: 10000, // Milliseconds
          maxWaitTime: 5000, // Milliseconds
          // iOS Only
          activityType: 'other',
          allowsBackgroundLocationUpdates: false,
          headingFilter: 1, // Degrees
          headingOrientation: 'portrait',
          pausesLocationUpdatesAutomatically: false,
          showsBackgroundLocationIndicator: false,
        });
        let locationSubscription = null;
        let locationTimeout = null;

        RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'fine',
          },
        }).then(granted => {
          // console.log('Location Permissions: ', granted);
          // if has permissions try to obtain location with RN location
          if (granted) {
            locationSubscription && locationSubscription();
            locationSubscription = RNLocation.subscribeToLocationUpdates(
              ([locations]) => {
                locationSubscription();
                locationTimeout && clearTimeout(locationTimeout);
                let coords = [locations.latitude, locations.longitude];

                if (isArraySame(coords, [location.lat, location.long])) {
                  // console.log('sama');
                  return;
                } else {
                  // console.log('posisi berubah');
                  // setDistance(
                  //   getDistance(
                  //     [schedule.attLocation[0], schedule.attLocation[1]],
                  //     coords,
                  //   ),
                  // );

                  setLocation({
                    long: locations.longitude,
                    lat: locations.latitude,
                    last_update: locations.timestamp,
                  });

                  // setCurrTime(jam_menit_detik());
                }
              },
            );
          } else {
            locationSubscription && locationSubscription();
            locationTimeout && clearTimeout(locationTimeout);
            console.log('no permissions to obtain location');
            setLocation({
              long: DEFAULT_LONGITUDE,
              lat: DEFAULT_LATITUDE,
              last_update: 0,
            });
          }
        });
      } else {
        console.log('location permission denied');
        Alert.alert('Location permission denied');
        setLocation({
          long: DEFAULT_LONGITUDE,
          lat: DEFAULT_LATITUDE,
          last_update: 0,
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //pakai ini apabila mau mendapatkan lokasi tiap user masuk ke halaman home
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // console.log('dapatkan lokasi user');
  //     GetLocation();
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    GetLocation();
  }, []);

  useEffect(() => {
    setLoading(true);
    getCityName(location)
      .then(res => {
        let data = res.plus_code.compound_code.split(',');
        setCityName({
          city: data[1].trimStart(),
          province: data[2].trimStart(),
        });
      })
      .catch(err => console.error(err));
    getCurrentAndForecastWeather(location)
      .then(res => {
        // console.log(res);
        setWeatherForecast(res);
        setStatus(true);
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setWeatherForecast({
          lat: DEFAULT_LATITUDE,
          lon: DEFAULT_LONGITUDE,
          timezone: 'Asia/Makassar',
          timezone_offset: 28800,
          current: {},
          hourly: [],
          daily: [],
        });
        setStatus(false);
        setLoading(false);
      });
  }, [location]);

  const {theme} = initialState;

  const onClickForecastHourly = forecastHourly => {
    console.log(forecastHourly);
    return Alert.alert(
      'Weather Forecast',
      `Detail Hourly Weather Forecast.
        \n.....
      `,
    );
  };

  const renderWeatherIcon = weather => {
    return weather === 'Rain' ? (
      <IconRain fill={'red'} width={30} height={30} />
    ) : weather === 'Clouds' ? (
      <IconClouds fill={theme.backgroundColor} width={30} height={30} />
    ) : weather === 'Clear' ? (
      <IconClear fill={theme.backgroundColor} width={30} height={30} />
    ) : (
      <IconClear fill={theme.backgroundColor} width={30} height={30} />
    );
  };

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.backgroundColor,
      }}>
      <ActivityIndicator color={theme.textColor} size="large" />
    </View>
  ) : (
    <Container>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.backgroundColor,
        }}>
        {status ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 25,
              }}>
              <View>
                <Text style={{fontSize: 38, color: theme.textColor}}>
                  {weatherForecast.current.weather
                    ? weatherForecast.current.weather[0].main
                    : 'Weather'}
                </Text>
                <Text style={{color: theme.textColor}}>
                  {isTodayOrYesterday === 'today'
                    ? today.toDateString()
                    : yesterday.toDateString()}
                </Text>
                <Text style={{color: theme.textColor}}>
                  {cityName.city}, {cityName.province}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 60,
                  fontWeight: 'bold',
                  color: theme.primaryColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {weatherForecast.current.temp
                  ? weatherForecast.current.temp.toFixed()
                  : 'Temp'}
                c
              </Text>

              {/* <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
              fontWeight: '100',
              marginTop: -3,
              color: theme.textColor,
            }}>
            Today's Report
          </Text> */}
            </View>
            <IconOutdoor width={width} height={180} style={{marginTop: 5}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginTop: 25,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'column', alignItems: 'center'}}
                onPress={() => handleChangeDay('yesterday')}>
                <Text
                  style={{
                    color: theme.textColor,
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Yesterday
                </Text>
                {isTodayOrYesterday === 'yesterday' && (
                  <View
                    style={{
                      backgroundColor: theme.textColor,
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                    }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'column', alignItems: 'center'}}
                onPress={() => handleChangeDay('today')}>
                <Text
                  style={{
                    color: theme.textColor,
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Today
                </Text>
                {isTodayOrYesterday === 'today' && (
                  <View
                    style={{
                      backgroundColor: theme.textColor,
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                    }}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() =>
                  navigation.navigate('NextDaysForecast', {
                    daily: weatherForecast.daily,
                    current: weatherForecast.current,
                  })
                }>
                <Text
                  style={{
                    color: theme.textColor,
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginRight: 5,
                    marginTop: -6,
                  }}>
                  Next 3 Days
                </Text>
                <IconRightArrow
                  width={10}
                  height={10}
                  fill={theme.textColor}
                  style={{marginTop: -3}}
                />
              </TouchableOpacity>
            </View>

            {isTodayOrYesterday === 'today' ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: theme.backgroundColor,
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                  marginTop: 5,
                }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {weatherForecast.hourly &&
                    weatherForecast.hourly.map((forecastHourly, index) => {
                      let backgroundColor =
                        timeNow ===
                        new Date(forecastHourly.dt * 1000).getHours()
                          ? theme.activeIconColor
                          : theme.secondaryBackgroundColor;
                      let textColor =
                        timeNow ===
                        new Date(forecastHourly.dt * 1000).getHours()
                          ? theme.backgroundColor
                          : theme.textColor;
                      const weatherStatus = [
                        'Clouds',
                        'Clear',
                        'Rain',
                        'Storm',
                      ];
                      const weather = forecastHourly.weather[0].main;
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            paddingHorizontal: 12,
                            paddingVertical: 12,
                            marginHorizontal: 6,
                            marginVertical: 5,
                            justifyContent: 'space-between',
                            width: 70,
                            paddingVertical: 15,
                            // paddingHorizontal: 15,
                            borderRadius: 40,
                            alignItems: 'center',
                            borderColor: theme.textColor,
                            borderWidth: 1,
                            backgroundColor: backgroundColor,
                          }}
                          onPress={() => onClickForecastHourly(forecastHourly)}>
                          <Text
                            style={{
                              color: textColor,
                              fontWeight: 'bold',
                              fontSize: 13,
                              // width: 80,
                            }}>
                            {hourAMPMFormat(forecastHourly.dt)}
                          </Text>
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 25,
                              marginVertical: 10,
                              backgroundColor: theme.headerBackgroundColor,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            {renderWeatherIcon(weather)}
                          </View>
                          <Text
                            style={{
                              color: textColor,
                            }}>
                            {forecastHourly.temp.toFixed()} c
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              </View>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: theme.textColor,
                  marginTop: 60,
                  fontSize: 32,
                }}>
                404 Not Found.
              </Text>
            )}
          </>
        ) : (
          <Text>Failed, tidak dapat mendapatkan data</Text>
        )}
      </View>
    </Container>
  );
};

export default Home;
