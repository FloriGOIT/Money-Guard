import style from './moneyGuard.module.scss';
import Card from './Card';
import { Link } from 'react-router-dom';
import ModalTime from './ModalTime';
import { useState,useEffect } from 'react';
import { months, currentYear, currentMonthLetter } from '../helpers/timeInfo';
import Balance from './Balance';
import AddButton from './TabletMobileDesign/AddButton';


const ListCardsMobile = ({ info, handleDeleteCard }) => {
  const [isSelectedYear, setIsSelectedYear] = useState(currentYear);
  const [isSelectedMonth, setIsSelectedMonth] = useState(currentMonthLetter);
  const [arrayMonthInSelectedYear, setArrayMonthInSelectedYear] = useState([]);


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
  const arrDataByYearAndMonth = arrDataByYear.filter(data => data.month === isSelectedMonth)
  const arrDataToDisplay = isSelectedMonth === "-" ? arrDataByYear : arrDataByYearAndMonth
  //useEffect(() => { if(setIsSelectedYear===prevValuesModals[0] || setIsSelectedMonth===prevValuesModals[1]){setIsSelectedYear(prevValuesModals[0]); setIsSelectedMonth(prevValuesModals[1]);} }, [info,prevValuesModals])

  return (
    <section className={style.listCards}>
      <Balance info={info} />

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
        <AddButton />
      </Link>
    </section>
  );
};

export default ListCardsMobile;

//<button type='button' className={`${style.addCard} ${style.selectedBtn}`}><IoAddSharp/></button>
