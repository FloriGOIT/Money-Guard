import style from '../components/moneyGuard.module.scss';
import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';

const ModalTime = ({ info, initialValue, name }) => {
  const [isModalOn, setisModalOn] = useState(false);
  const [isModalHeader, setIsModalHeader] = useState(initialValue); //2025
  const handleOptionSelect = value => {
    setIsModalHeader(value);
    setisModalOn(prev => (prev = !prev));
  };

  return (
    <div className={style.statisticsPeriod}>
      <div className={style.headerPeriod}>
        <span>{isModalHeader}</span>
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            setisModalOn(prev => (prev = !prev));
          }}
        >
          {isModalOn ? <FaChevronUp /> : <FaAngleDown />}
        </button>
      </div>
      {isModalOn ? (
        <ul className={`${style.listPeriod} ${style[name]}`}>
          {info.map(info => (
            <li key={info.name}>
              <button
                type="button"
                onClick={() => handleOptionSelect(info.name)}
              >
                {info.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default ModalTime;
