
import { api } from "../config/axiosConfig";

export const PokeApi = {
    getPokemonById: async function(id:any){
        return api.get(`/pokemon/${id}`)
    }
}
