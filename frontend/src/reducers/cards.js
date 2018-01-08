import { without } from 'lodash';
const SET_CARDS = 'cards/SET_CARDS';
const ADD_CARD = 'cards/ADD_CARD';
const REMOVE_CARD = 'cards/REMOVE_CARD';
const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CARDS:
      return [...state, ...action.payload];
    case ADD_CARD:
      return [action.payload, ...state];
    case REMOVE_CARD:
      return without(state, action.payload);
    default:
      return state;
  }
}

export function setCards(resources) {
  return {
    type: SET_CARDS,
    payload: resources
  };
}

export function removeCard(card) {
  return {
    type: REMOVE_CARD,
    payload: card
  };
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    payload: card
  };
}
