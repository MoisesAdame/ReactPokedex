// objeto pokemon detallado
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  experience: number;
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
  };
}
