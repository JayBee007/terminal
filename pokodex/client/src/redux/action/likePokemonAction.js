import C from '../constant';

export const likePokemonRequest = (id, name, avatar, abilities, types) => {
  return {
    type: C.POST_POKEMON_LIKE_REQUEST,
    id,
    name,
    avatar,
    abilities,
    types
  }
}
