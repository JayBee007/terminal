//https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke
import * as types from './mutation-types';
import axios from 'axios';

export const initJokes = ({commit}) => {
  axios.get('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten')
    .then(res => res.data)
    .then(data => commit(types.INIT_JOKES, data))
}

export const addJoke = ({commit}) => {
  axios.get('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke')
    .then(res => res.data)
    .then(data => commit(types.ADD_JOKE, data))
}

export const removeJoke = ({commit}, index) => {
  commit(types.REMOVE_JOKE, index)
}
