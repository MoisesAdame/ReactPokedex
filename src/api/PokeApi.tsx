import { api } from '../config/axiosConfig';

export const PokeApi = {
  getPokemonById: async function (id: any) {
    return api.get(`/pokemon/${id}`);
  },
  getPaginationPokemons: async function (limit = 20, offset = 0) {
    return api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  }
};
