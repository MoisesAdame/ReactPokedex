// Importa el módulo 'api' desde la configuración de axios
import { api } from '../config/axiosConfig'; 

export const PokeApi = {
  // Función asincrónica para obtener un Pokémon por su ID
  getPokemonById: async function (id: any) {
    // Realiza una solicitud GET para obtener información del Pokémon 
    // con el ID proporcionado
    return api.get(`/pokemon/${id}`);
  },
  // Función asincrónica para obtener una lista paginada de Pokémon
  getPaginationPokemons: async function (limit = 20, offset = 0) { 
    // Realiza una solicitud GET para obtener una lista paginada de 
    // Pokémon con los límites y desplazamientos especificados
    return api.get(`/pokemon?limit=${limit}&offset=${offset}`); 
  }
};
