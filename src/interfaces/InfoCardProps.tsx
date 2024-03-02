export interface InfoCardProps {
    id: string;
    imageUrl: string;
    name: string;
    experience: number;
    height: number;
    weight: number;
    abilities: string[]; // Lista de habilidades
    stats: {
      hp: number;
      attack: number;
      defense: number;
      specialAttack: number;
      specialDefense: number;
    };
  }