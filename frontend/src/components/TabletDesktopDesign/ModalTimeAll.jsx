import style from '../../components/moneyGuard.module.scss';
import { useState, useEffect, useRef } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import { currentYear, currentMonthLetter } from '../../helpers/timeInfo';

const ModalTimeAll = ({ info, handleYearMonth }) => {
  const [isSelectedYear, setIsSelectedYear] = useState(currentYear);
  const [isSelectedMonth, setIsSelectedMonth] = useState(currentMonthLetter);
  const [isModalYearOn, setisModalYearOn] = useState(false);
  const [isModalMonthOn, setisModalMonthOn] = useState(false);

  const modalRefYear = useRef(null);
  const modalRefMonth = useRef(null);

  // 🧠 This ref always stores the latest selected month
  const selectedMonthRef = useRef(currentMonthLetter);
  // 🧠 This ref helps skip the effect on first mount
  const isFirstRender = useRef(true);

  // 🧠 Update the ref whenever user changes month
  const handleOptionMonth = (value) => {
    setisModalMonthOn(false);
    setIsSelectedMonth(value);
    selectedMonthRef.current = value; // <--- persist month across info changes
    handleYearMonth(prev => ({ ...prev, month: value }));
  };

  const handleOptionYear = (value) => {
    setisModalYearOn(false);
    setIsSelectedMonth('-');
    selectedMonthRef.current = '-';
    handleYearMonth({ year: value, month: '-' });
    setIsSelectedYear(value);
  };

  // 🧠 Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRefYear.current &&
        !modalRefYear.current.contains(event.target)
      ) setisModalYearOn(false);

      if (
        modalRefMonth.current &&
        !modalRefMonth.current.contains(event.target)
      ) setisModalMonthOn(false);
    };

    if (isModalYearOn || isModalMonthOn) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalYearOn, isModalMonthOn]);

  // 🧠 Restore previously selected month when info changes (but skip on mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsSelectedMonth(selectedMonthRef.current);
  }, [info]);

  const optionsYears = [...new Set(info.map(el => el.year))];

  const optionsMonths = [
    ...new Set(
      info
        .filter(el => Number(el.year) === Number(isSelectedYear))
        .map(el => el.month)
    ),
    '-',
  ];

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
          <ul className={style.listPeriod}>
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
          <ul className={style.listPeriod}>
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
