import style from './moneyGuard.module.scss';
import Card from './Card';
import { IoAddSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import ModalTime from './ModalTime';
import { useState,useEffect } from 'react';
import { months,currentYear } from 'helpers/timeInfo';

const ListCards = ({ info, handleDeleteCard }) => {
  const [isSelectedYear, setIsSelectedYear] = useState(currentYear);
  const [isSelectedMonth, setIsSelectedMonth] = useState('-');
  const [arrayMonthInSelectedYear, setArrayMonthInSelectedYear] = useState([]);

  const balance = info.reduce((acc, data) => {
    if (data.type === false) {
      return acc + Number(data.amount);
    } else if (data.type === true) {
      return acc - Number(data.amount);
    }
    return acc;
  }, 0);

  const handleYear = value => setIsSelectedYear(value);
  const filterYearsForSelection = info
    .map(card => card.year)
    .filter((el, index, arr) => arr.indexOf(el) === index)
    .sort((a, b) => a.localeCompare(b))
    .map(year => {
      return { number: year, name: year };
    });
  
const handleMonth = value => setIsSelectedMonth(value);
  
    useEffect(() => {
      const selectedYear = info.filter(
        info => Number(info.year) === Number(isSelectedYear)
      );
      const availableMonths = selectedYear.map(info => info.month);
      const uniqueMonths = [...new Set(availableMonths)];
      const filteredMonths = months.filter(month =>
        uniqueMonths.includes(month.name)
      );
      filteredMonths.push({ number: '-', name: '-' });
  
      setArrayMonthInSelectedYear(filteredMonths);
    }, [isSelectedYear, info]);

  const arrDataByYear = info.filter(data => Number(data.year) === Number(isSelectedYear))
  .sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log("arrDataByYear",arrDataByYear)
  const arrDataByYearAndMonth = arrDataByYear.filter(data => data.month === isSelectedMonth)
  console.log("arrDataByYearAndMonth",arrDataByYearAndMonth)
  const arrDataToDisplay = isSelectedMonth === "-" ? arrDataByYear : arrDataByYearAndMonth


  return (
    <section className={style.listCards}>
      <div className={style.totalSum}>
        <span>
          Balance: <br />
          <span
            style={{
              color: balance <= 0 ? '#be242496' : 'rgb(194, 240, 126)',
              fontWeight: 900,
            }}
          >
            {' '}
            {new Intl.NumberFormat('fr-FR').format(balance.toFixed(2))}
          </span>{' '}
          RON
        </span>
      </div>

      <ModalTime
        initialValue={isSelectedYear}
        infoPeriod={filterYearsForSelection}
        handleYear={handleYear}
        handleMonth={handleMonth}
        name="years"
      />

      <ModalTime
          initialValue={isSelectedMonth}
          infoPeriod={arrayMonthInSelectedYear}
          handleMonth={handleMonth}
          name="months"
      />

      {arrDataToDisplay.map((data, index) => (
        <Card
          data={data}
          key={index + 1}
          handleDeleteCard={handleDeleteCard}
          id={index + 1}
        />
      ))}
      <Link to="/newCard" className={style.addCardButton}>
        <IoAddSharp />
      </Link>
    </section>
  );
};

export default ListCards;

//<button type='button' className={`${style.addCard} ${style.selectedBtn}`}><IoAddSharp/></button>
