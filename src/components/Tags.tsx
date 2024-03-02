import React from 'react';
import './tags.css';

interface TagsProps {
  color: string;
  text: string;
}

export default function Tags(props: TagsProps) {
  return (
    <div
      className={`tag ${props.color === 'hp' ? 'hp' : ''} ${props.color === 'atk' ? 'atk' : ''} ${props.color === 'def' ? 'def' : ''} ${props.color === 'spa' ? 'spa' : ''} ${props.color === 'spd' ? 'spd' : ''} ${props.color === 'abilities' ? 'abilities' : ''}`}
    >
      <div className="info__stats">{props.text}</div>
    </div>
  );
}
