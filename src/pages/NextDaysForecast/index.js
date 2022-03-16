import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Container} from '../../components';
import {useSelector} from 'react-redux';
import {IconBack, IconClear, IconClouds, IconRain} from '../../assets';

const NextDaysForecast = ({route, navigation}) => {
  const {daily, current} = route.params;
  const initialState = useSelector(reducer => reducer.GlobalReducer);
  const {theme} = initialState;
  const next3Days = daily.slice(1, 4);

  const renderWeatherIcon = weather => {
    return weather === 'Rain' ? (
      <IconRain fill={theme.backgroundColor} width={30} height={30} />
    ) : weather === 'Clouds' ? (
      <IconClouds fill={theme.backgroundColor} width={30} height={30} />
    ) : weather === 'Clear' ? (
      <IconClear fill={theme.backgroundColor} width={30} height={30} />
    ) : (
      <IconClear fill={theme.backgroundColor} width={30} height={30} />
    );
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: theme.backgroundColor,
        }}>
        <View
          style={{
            backgroundColor: theme.backgroundColor,
            flexDirection: 'column',
          }}>
          <StatusBar barStyle={theme.statusBarStyle} />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: 25,
              marginLeft: 15,
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <IconBack fill={theme.textColor} width={25} height={25} />
            <Text
              style={{
                color: theme.textColor,
                fontSize: 16,
                marginLeft: 20,
              }}>
              Weather Forecast
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: theme.textColor,
              fontSize: 26,
              fontWeight: 'bold',
              paddingLeft: 25,
              marginTop: 25,
            }}>
            Next 3 Days
          </Text>
          <View
            style={{
              margin: 25,
              flex: 1,
              backgroundColor: theme.secondaryBackgroundColor,
              flexDirection: 'column',
              shadowColor: theme.secondaryBackgroundColor,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 20,
              paddingVertical: 15,
              borderColor: theme.secondaryBackgroundColor,
              borderRadius: 10,
              borderWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 5,
                paddingHorizontal: 25,
                paddingBottom: 30,
                alignItems: 'center',
              }}>
              <Text style={{color: theme.textColor, fontSize: 22}}>Today</Text>
              <Text style={{color: theme.textColor, fontSize: 14}}>
                <Text style={{fontWeight: 'bold', fontSize: 22}}>
                  {current.temp}
                </Text>
                /{daily[0].temp.max} c
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 25,
                alignItems: 'center',
              }}>
              <Text style={{color: theme.textColor, fontSize: 14, flex: 1}}>
                Wind
              </Text>
              <Text style={{color: theme.iconColor, marginLeft: 20}}>
                {current.wind_speed}m/h
              </Text>
              <Text
                style={{
                  color: theme.textColor,
                  fontSize: 14,
                  textAlign: 'right',
                  marginLeft: 35,
                  flex: 1,
                }}>
                Humidity
              </Text>
              <Text
                style={{color: theme.iconColor, flex: 1, textAlign: 'center'}}>
                {current.humidity}%
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 25,
                alignItems: 'center',
                marginTop: 10,
                paddingBottom: 15,
              }}>
              <Text
                style={{
                  color: theme.textColor,
                  fontSize: 14,
                }}>
                Visibility
              </Text>
              <Text style={{color: theme.iconColor, marginLeft: 30}}>
                {current.visibility}m/h
              </Text>
              <Text
                style={{
                  color: theme.textColor,
                  fontSize: 14,
                  textAlign: 'center',
                  flex: 1,
                  marginLeft: 45,
                }}>
                UV
              </Text>
              <Text
                style={{
                  color: theme.iconColor,
                  textAlign: 'right',
                  // flex: 1,
                  marginRight: 20,
                }}>
                {current.uvi}
              </Text>
            </View>
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 25,
              marginTop: 25,
            }}>
            <View>
              <Text style={{color: theme.textColor}}>Today</Text>
              <Text style={{color: theme.textColor}}>
                {daily[0].temp.min}/{daily[0].temp.max} c
              </Text>
              <Text style={{color: theme.textColor}}>
                {currWeather || 'Weather'}
              </Text>
            </View>
          </View> */}

          <View style={{marginBottom: 100}}>
            {next3Days.map((day, index) => {
              let date = new Date(day.dt * 1000);
              const weather = day.weather[0].main;
              return (
                <View
                  key={index}
                  style={{
                    // flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 35,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: theme.headerBackgroundColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: -25,
                    }}>
                    {renderWeatherIcon(weather)}
                  </View>
                  <View>
                    <Text
                      style={{
                        color: theme.textColor,
                      }}>
                      {date.toLocaleDateString('default', {
                        month: 'long',
                      })}
                    </Text>
                    <Text style={{color: theme.textColor}}>
                      <Text
                        style={{
                          fontSize: 32,
                          fontWeight: 'bold',
                          color: theme.textColor,
                        }}>
                        {day.temp.min.toFixed()}
                      </Text>
                      /{day.temp.max.toFixed()} c
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text style={{color: theme.iconColor, marginBottom: 10}}>
                      Rain
                    </Text>
                    <Text style={{color: theme.textColor}}>
                      {day.rain.toFixed()}%
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text style={{color: theme.iconColor, marginBottom: 10}}>
                      Humidity
                    </Text>
                    <Text style={{color: theme.textColor}}>
                      {day.humidity.toFixed()}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default NextDaysForecast;
