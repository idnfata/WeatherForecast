import {combineReducers} from 'redux';
import {lightTheme} from '../../utils';

const initialState = {
  theme: lightTheme,
  isLoading: false,
  isLogin: false,
  message: '',
  userInfo: {
    name: 'Fatahillah Ibrahim',
    title: 'Programmer',
    email: 'fatahillahibrahim0701@gmail.com',
  },
};

/*
  Sebuah function yang menampung dan merubah state
*/

const initialStateRegister = {
  formData: {
    fullName: '',
    email: '',
    password: '',
  },
  title: 'Register Page',
};

const initialStateLogin = {
  formData: {
    email: '',
    password: '',
  },
};

const initialStateEditProfile = {
  formData: {
    name: '',
    phone: '',
  },
};

const RegisterReducer = (state = initialStateRegister, action) => {
  if (action.type === 'SET_FORM') {
    return {
      ...state,
      formData: {
        ...state.formData,
        [action.field]: action.value,
      },
    };
  }
  return state;
};

const LoginReducer = (state = initialStateLogin, action) => {
  if (action.type === 'SET_FORM') {
    return {
      ...state,
      formData: {
        ...state.formData,
        [action.field]: action.value,
      },
    };
  }
  return state;
};

const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userInfo: action.value,
      };
    case 'SET_ISLOGIN':
      return {
        ...state,
        isLogin: action.value,
      };
    case 'SET_ISLOADING':
      return {
        ...state,
        isLoading: action.value,
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.value,
      };
    case 'SWITCH_THEME':
      return {
        ...state,
        theme: action.value,
      };
    default:
      break;
  }
  return state;
};

const reducer = combineReducers({
  RegisterReducer,
  LoginReducer,
  GlobalReducer,
});

export default reducer;
