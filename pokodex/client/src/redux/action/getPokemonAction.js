import C from '../constant';

export const getPokemonRequest = (limit, offset) => ({
  type: C.GET_POKEMON_REQUEST,
  limit,
  offset
});
