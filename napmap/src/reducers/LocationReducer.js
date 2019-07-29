import {
  LOCATION_UPDATE,
  DESTINATION_CHANGED,
  DESTINATION_CREATE,
  DESTINATION_REACHED
} from '../actions/types';

const INITIAL_STATE = {
  location: {
    latitude: '',
    longtitude: ''
  },
  destination: '',
  distance: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case DESTINATION_CHANGED:
      return { ...state, destination: action.payload };
    case DESTINATION_CREATE:
      return INITIAL_STATE;
    case DESTINATION_REACHED:
      return INITIAL_STATE;
    default:
      return state;
  }
};
