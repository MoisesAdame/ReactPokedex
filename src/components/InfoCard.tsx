import React from 'react';
import './InfoCard.css';
import Tag from './Tags';

interface InfoCardProps {
  id: string;
  imageUrl: string;
  name: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ id, imageUrl, name }) => {
  return (
    <div className="info__outter__frame">
        <div className="info__centered__box">
            <div className="info__circle">
                <img className="info__img" src={imageUrl} alt="Card" />
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
                    <div className="info__txt">112</div>
                    <div className="info__txt">4</div>
                    <div className="info__txt">60</div>
                </div>
                <div className="info__subtitles px-28">Habilidades</div>
                <div className="grid grid-flow-col auto-cols-max gap-4 px-28 mt-6">
                    <Tag color="abilities" text="Static"></Tag>
                    <Tag color="abilities" text="Lightning Rod"></Tag>
                </div>
                <div className="info__subtitles px-28">Stats</div>
                <div className="grid grid-flow-col auto-cols-max gap-36 px-48 mt-6">
                    <div className="info__stats__titles">HP</div>
                        <div className="info__stats__titles">ATK</div>
                        <div className="info__stats__titles">DEF</div>
                        <div className="info__stats__titles">SPA</div>
                        <div className="info__stats__titles">SPD</div>
                    </div>
                <div className="grid grid-flow-col auto-cols-max gap-4 px-28 mt-6">
                    <Tag color="hp" text="35"></Tag>
                    <Tag color="atk" text="55"></Tag>
                    <Tag color="def" text="40"></Tag>
                    <Tag color="spa" text="50"></Tag>
                    <Tag color="spd" text="50"></Tag>
                </div>
            </div>
        </div>
    </div>
  );
};

export default InfoCard;