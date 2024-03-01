import React from 'react';
import './InfoCard.css';
import Tag from './Tags';

interface InfoCardProps {
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
  

const InfoCard: React.FC<InfoCardProps> = ({ 
    id, 
    imageUrl, 
    name, 
    experience, 
    height, 
    weight, 
    abilities, 
    stats 
  }) => {
    return (
      <div className="info__outter__frame">
          <div className="info__centered__box">
              <div className="info__circle">
                  <img className="info__img" src={imageUrl} alt={name} />
              </div>
              <div className='info__box'>
                  <div className="info__frame">
                      <div className="info__name">{name}</div>
                  </div>
                  <div className="grid grid-cols-3 px-28">
                      <div className="info__subtitles">Experiencia</div>
                      <div className="info__subtitles">Altura</div>
                      <div className="info__subtitles">Peso</div>
                  </div>
                  <div className="grid grid-cols-3 px-28">
                      <div className="info__txt">{experience}</div>
                      <div className="info__txt">{height}</div>
                      <div className="info__txt">{weight}</div>
                  </div>
                  <div className="info__subtitles px-28">Habilidades</div>
                  <div className="grid grid-flow-col auto-cols-max px-28 gap-4 mt-6">
                      {abilities.map((ability, index) => (
                          <Tag key={index} color="abilities" text={ability}></Tag>
                      ))}
                  </div>
                  <div className="info__subtitles px-28">Stats</div>
                  <div className="grid grid-flow-col auto-cols-max gap-36 px-48 mt-6">
                      <div className="info__stats__titles">HP</div>
                      <div className="info__stats__titles">ATK</div>
                      <div className="info__stats__titles">DEF</div>
                      <div className="info__stats__titles">SPA</div>
                      <div className="info__stats__titles">SPD</div>
                  </div>
                  <div className="grid grid-flow-col auto-cols-max gap-4 px-28">
                      <Tag color="hp" text={stats.hp.toString()}></Tag>
                      <Tag color="atk" text={stats.attack.toString()}></Tag>
                      <Tag color="def" text={stats.defense.toString()}></Tag>
                      <Tag color="spa" text={stats.specialAttack.toString()}></Tag>
                      <Tag color="spd" text={stats.specialDefense.toString()}></Tag>
                  </div>
              </div>
          </div>
      </div>
    );
  };
  

export default InfoCard;