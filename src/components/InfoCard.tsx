import React from 'react';
import './InfoCard.css';
import Tag from './Tags'; // Importa el componente Tag
import arrow from '../images/arrow.png';
import { useNavigate } from 'react-router-dom';
import { InfoCardProps } from '../interfaces/InfoCardProps';

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
  const navigate = useNavigate();

  // Función para navegar de regreso a la página principal
  function returnToHome() {
    navigate(`/`);
  }

  return (
    <div className="info__outter__frame">
      <div className="info__frame__grid">
        <div className="info__centered__box">
          <div className="info__box">
            <div className="info__frame">
              <div className="grid grid-cols-2 w-1/12">
                <div className="mt-16">
                  {/* Botón para volver a la página principal */}
                  <button onClick={returnToHome}>
                    {' '}
                    <img src={arrow} alt="back" />
                  </button>
                </div>
                <div className="info__name">{name}</div>
              </div>
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
            <div className="grid grid-flow-col max-w-screen-sm px-28 gap-6 mt-6">
              {/* Renderiza las etiquetas de habilidades */}
              {abilities.map((ability, index) => (
                <Tag key={index} color="abilities" text={ability}></Tag>
              ))}
            </div>
            <div className="info__subtitles px-28">Stats</div>
            <div className="grid grid-flow-col max-w-screen-md flex justify-stretch gap-x-24  px-40 mt-6">
              <div className="info__stats__titles">HP</div>
              <div className="info__stats__titles">ATK</div>
              <div className="info__stats__titles">DEF</div>
              <div className="info__stats__titles">SPA</div>
              <div className="info__stats__titles">SPD</div>
            </div>
            <div className="grid grid-flow-col max-w-screen-sm gap-6 px-28">
              {/* Renderiza las etiquetas de estadísticas */}
              <Tag color="hp" text={stats.hp.toString()}></Tag>
              <Tag color="atk" text={stats.attack.toString()}></Tag>
              <Tag color="def" text={stats.defense.toString()}></Tag>
              <Tag color="spa" text={stats.specialAttack.toString()}></Tag>
              <Tag color="spd" text={stats.specialDefense.toString()}></Tag>
            </div>
          </div>
        </div>
        <div className="info__circle">
          <img className="info__img" src={imageUrl} alt={name} />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
