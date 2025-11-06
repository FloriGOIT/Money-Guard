import style from '../../components/moneyGuard.module.scss';
import { useState, useEffect, useRef } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import { currentYear, currentMonthLetter } from '../../helpers/timeInfo';

const ModalTimeAll = ({ info, handleYearMonth }) => {
  const selectedMonthRef = useRef(currentMonthLetter);
  const [isSelectedYear, setIsSelectedYear] = useState(currentYear);
  const [isSelectedMonth, setIsSelectedMonth] = useState(selectedMonthRef.current);
  const [isModalYearOn, setisModalYearOn] = useState(false);
  const [isModalMonthOn, setisModalMonthOn] = useState(false);

  const modalRefYear = useRef(null);
  const modalRefMonth = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRefYear.current &&
        !modalRefYear.current.contains(event.target)
      ) {
        setisModalYearOn(false);
      }

      if (
        modalRefMonth.current &&
        !modalRefMonth.current.contains(event.target)
      ) {
        setisModalMonthOn(false);
      }
    };

    if (isModalYearOn || isModalMonthOn) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalYearOn, isModalMonthOn]);

  const optionsYears = info
    .map(el => el.year)
    .filter((el, idx, arr) => arr.indexOf(el) === idx);

  const optionsMonths = info
    .filter(el => Number(el.year) === Number(isSelectedYear))
    .map(el => el.month)
    .filter((el, idx, arr) => arr.indexOf(el) === idx);
  optionsMonths.push("-");

const handleOptionYear = (value) => {
    setisModalYearOn(false);
    selectedMonthRef.current = "-";
    setIsSelectedMonth("-");
    handleYearMonth({ year: value, month: "-" });
    setIsSelectedYear(value);
  };

  const handleOptionMonth = (value) => {
    setisModalMonthOn(false);
    selectedMonthRef.current = value;
    setIsSelectedMonth(value);
    handleYearMonth(prev => ({ ...prev, month: value }));
  };

  return (
    <div className={style.modalTimeSelect} ref={modalRefYear}>
      <div className={style.years}>
        <div
          className={
            isModalYearOn
              ? `${style.headerPeriodOff} ${style.headerPeriodOn}`
              : `${style.headerPeriodOff}`
          }
        >
          <span>{isSelectedYear}</span>
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              setisModalYearOn(prev => !prev);
            }}
          >
            {isModalYearOn ? <FaChevronUp /> : <FaAngleDown />}
          </button>
        </div>
        {isModalYearOn && (
          <ul className={`${style.listPeriod}`}>
            {optionsYears.map(item => (
              <li key={nanoid()}>
                <button type="button" onClick={() => handleOptionYear(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={style.months} ref={modalRefMonth}>
        <div
          className={
            isModalMonthOn
              ? `${style.headerPeriodOff} ${style.headerPeriodOn}`
              : `${style.headerPeriodOff}`
          }
        >
          <span>{isSelectedMonth}</span>
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              setisModalMonthOn(prev => !prev);
            }}
          >
            {isModalMonthOn ? <FaChevronUp /> : <FaAngleDown />}
          </button>
        </div>
        {isModalMonthOn && (
          <ul className={`${style.listPeriod}`}>
            {optionsMonths.map(item => (
              <li key={nanoid()}>
                <button type="button" onClick={() => handleOptionMonth(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModalTimeAll;
