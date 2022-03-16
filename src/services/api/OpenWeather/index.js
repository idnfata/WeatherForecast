import Get from '../Get';

const APIKey = '798789701c976ecce33c6174b2fe6393';

export const getWeatherByLatLng = coords =>
  Get(
    'weather',
    `weather?lat=${coords.lat}&lon=${coords.long}&appid=${APIKey}`,
  );

export const getWeatherByCityName = cityName =>
  Get('weather', `weather?q=${cityName}&units=metric&appid=${APIKey}`);

export const getCurrentAndForecastWeather = coords =>
  Get(
    'weather',
    `onecall?lat=${coords.lat}&lon=${coords.long}&units=metric&exclude=minutely&appid=${APIKey}`,
  );
