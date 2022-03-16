import API, {userLogin, userLogout} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const removeToken = async () => {
  try {
    return await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log('errornya adalah: ', error);
    return false;
  }
};

export const loginUser = formData => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({type: 'CHANGE_ISLOADING', value: true});
    userLogin(formData)
      .then(async result => {
        // console.log(result);
        if (result.status === 200) {
          try {
            await AsyncStorage.setItem('token', result.data.token);
            dispatch({type: 'SET_ISLOGIN', value: true});
            dispatch({type: 'SET_ISLOADING', value: false});
            dispatch({type: 'SET_MESSAGE', value: 'Login Success'});
          } catch (error) {
            console.log(error);
          }

          resolve(true);
        }
      })
      .catch(err => {
        if (err.response) {
          // console.log(err.response.data.message);
          dispatch({type: 'SET_ISLOADING', value: false});
          dispatch({type: 'SET_MESSAGE', value: err.response.data.message});
          dispatch({type: 'SET_ISLOGIN', value: false});
          reject(false);
        }
      });
  }).catch(err => err);
};

export const getUserToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeUserToken = () => dispatch => {
  removeToken().then(() => {
    console.log('sukses hapus token');
    dispatch({type: 'SET_USER', value: {}});
    dispatch({type: 'SET_ISLOGIN', value: false});
  });
};

export const setUser = data => dispatch => {
  dispatch({type: 'SET_USER', value: data});
  dispatch({type: 'SET_ISLOGIN', value: true});
};

export const logoutUser = () => dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({type: 'CHANGE_ISLOADING', value: true});
    const token = await AsyncStorage.getItem('token');
    // console.log('token logout', token);

    userLogout(token)
      .then(async result => {
        if (result.status === 'success') {
          // console.log(result);
          try {
            dispatch({type: 'SET_USER', value: {}});
            await AsyncStorage.removeItem('token').then(() => {
              dispatch({type: 'SET_MESSAGE', value: result.message});

              // console.log('sukses hapus token');
              dispatch({type: 'SET_ISLOGIN', value: false});

              dispatch({type: 'SET_ISLOADING', value: false});
            });

            resolve(true);
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch(err => {
        if (err.response) {
          // console.log(err);
          console.log(err.response.data);
          dispatch({type: 'SET_MESSAGE', value: err.response.data.message});
          dispatch({type: 'SET_ISLOGIN', value: false});
          dispatch({type: 'SET_ISLOADING', value: false});
          reject(false);
        }
      });
  }).catch(err => err);
};

export const onClickLogout = () => dispatch => {
  // console.log(dispatch);
  // console.log('handle logout');
  const res = dispatch(logoutUser()).catch(err => err);
  // console.log('res', res);
  //auto ke halaman auth bila berhasil logout
  // if (res) {
  //   props.navigation.navigate('AuthStack', {screen: 'Splash'});
  //   // console.log(props);
  //   console.log('logout');
  // } else {
  //   Alert.alert('Logout Gagal');
  //   // props.navigation.navigate('Splash');

  //   // console.log(props);
  // }
};
