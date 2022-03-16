import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import {searchBackground} from '../../assets';
import {getWeatherByCityName} from '../../services';

const Search = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const handleWeatherSearch = () => {
    setLoading(true);
    setInput('');
    getWeatherByCityName(input)
      .then(res => {
        // console.log(res);
        setData(res);
        setStatus(true);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setStatus(false);
        setLoading(false);
      });
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={searchBackground}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <TextInput
            placeholder="Enter city name and press return..."
            style={styles.textInput}
            onChangeText={text => setInput(text)}
            placeholderTextColor={'#000'}
            onSubmitEditing={() => handleWeatherSearch()}
            value={input}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} color={'#fff'} />
          </View>
        )}
        {data && status ? (
          <View style={styles.infoView}>
            <Text
              style={
                styles.cityCountryText
              }>{`${data?.name}, ${data?.sys?.country}`}</Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>{`${Math.round(
              data?.main?.temp,
            )} °C`}</Text>
            <Text style={styles.minMaxText}>{`Min ${Math.round(
              data?.main?.temp_min,
            )} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
          </View>
        ) : (
          !loading && (
            <View style={styles.infoView}>
              <Text style={styles.dateText}>City Name Not Found...</Text>
            </View>
          )
        )}
      </ImageBackground>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },

  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    paddingLeft: 20,
    marginVertical: 40,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 19,
    fontWeight: '300',
    borderRadius: 16,
    borderBottomColor: '#df8e00',
  },

  cityCountryText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },

  infoView: {
    alignItems: 'center',
  },

  dateText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    color: '#fff',
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 22,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '500',
  },
});
