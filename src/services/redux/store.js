import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
//store ini adalah sebuah tempat/wadah untuk menyimpan state secara global
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
