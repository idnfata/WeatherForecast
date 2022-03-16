// import API from '../../api';

import AsyncStorage from '@react-native-async-storage/async-storage';

//untuk merubah value dari inputan
export const setForm = (forField, value) => {
  return {type: 'SET_FORM', field: forField, value: value};
};

export const switchTheme = theme => async dispatch => {
  try {
    await AsyncStorage.setItem('theme', theme.mode).then(() => {
      return dispatch({type: 'SWITCH_THEME', value: theme});
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getTheme = async () => {
  try {
    return await AsyncStorage.getItem('theme');
  } catch (error) {
    console.log(error);
    return false;
  }
};
