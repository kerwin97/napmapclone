import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER
} from './types';


export const emailChanged = (text) => {
  return {
    //this text in type is what links the action and reducer
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const signupUser = ({ email, password }) => {
  return (dispatch) => {
    //this text in type is what links the action and reducer
    dispatch({ type: SIGNUP_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(user => loginUserFail(dispatch, user));
  };
};

export const loginUser = ({ email, password }) => {
  //dispatch is so that loginUser and loading can happen together
  //dispatch is manual so provides more control
  //manually send an action off to all the reducers in the application
  //this means actions can be done asynchronously
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);
      });
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.MainPage();
  //employeeList from the router was transferred to { Actions }
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
   });
};
