import style from '../components/moneyGuard.module.scss';
import { useState, useEffect, useRef } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';

const ModalTime = ({ info, initialValue, name, handleMonth, handleYear }) => {
  const [isModalOn, setisModalOn] = useState(false);
  const modalRef = useRef(null); // Step 1: Create a ref
console.log("infoModal", info)
  // Step 2: Click outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setisModalOn(false);
      }
    };

    if (isModalOn) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOn]);

  const handleOptionSelect = (value) => {
    setisModalOn(false);
    if (name === "months") handleMonth(value);
    if (name === "years") {
      handleMonth("-");
      handleYear(value);
    }
  };

  return (
    <div className={style.statisticsPeriod} ref={modalRef}>
      <div className={isModalOn ? `${style.headerPeriodOff} ${style.headerPeriodOn}`: `${style.headerPeriodOff}`}>
        <span>{initialValue}</span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setisModalOn((prev) => !prev);
          }}
        >
          {isModalOn ? <FaChevronUp /> : <FaAngleDown />}
        </button>
      </div>
      {isModalOn && (
        <ul className={`${style.listPeriod} ${style[name]}`}>
          {info.map((item) => (
            <li key={item.name}>
              <button type="button" onClick={() => handleOptionSelect(item.name)}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModalTime;

