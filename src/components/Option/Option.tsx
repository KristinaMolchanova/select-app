import React from 'react';
import './Option.scss';

interface OptionProps {
  option: {
    id: string;
    icon: string;
    text: string;
  };
  onClick: () => void;
}

const Option: React.FC<OptionProps> = ({ option, onClick }) => {
  return (
    <li className='option' onClick={onClick}>
      <div className='option__icon'>
        <img src={option.icon} alt={option.text} />
      </div>
      <div className='option__text'>{option.text}</div>
    </li>
  );
};

export default Option;
