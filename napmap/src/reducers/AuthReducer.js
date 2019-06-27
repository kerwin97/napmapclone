import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  //always start with switch statement
  //switch statement to change state
  //can never return undefined for reducer thus INITIAL_STATE is empty
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
      //make new object, take all properties from state
      //change the email property of state to action.payload
      //this new object is a copy of state, less the email portion
      //use mapStateToProps to move this new state back to LoginForm component
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: '',
        error: '',
        loading: false,
        password: ''
       };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Authentication Failed',
        password: '',
        loading: false
      };
    default:
      return state;
 }
};
