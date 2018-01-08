import { clearAuthData, prepareAuthData, setAuthData } from '../helpers/authData';
const SET_USER = 'auth/SET_USER';
const LOGOUT = 'auth/LOGOUT';
const SET_AUTH_DATA_TO_STORE = 'auth/SET_AUTH_DATA_TO_STORE';

const initialState = {
  user: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_AUTH_DATA_TO_STORE:
      setAuthData(action.payload);
      return {
        ...state,
        auth_data: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

export function setUser(resource) {
  return {
    type: SET_USER,
    payload: resource
  };
}

export function setAuthDataToStore(data) {
  return {
    type: SET_AUTH_DATA_TO_STORE,
    payload: prepareAuthData(data)
  };
}

export function logout() {
  clearAuthData();
  return {
    type: LOGOUT
  };
}
