
import style from './moneyGuard.module.scss';
import Card from './Card';
import { IoAddSharp } from 'react-icons/io5';
import { Link} from 'react-router-dom';
import ModalTime from './ModalTime';
import { useState } from 'react';
import { months, currentMonth, currentYear } from 'helpers/timeInfo';


const ListCards = ({ info, handleDeleteCard }) => {
  const monthLetter = months.filter(m=>m.number === currentMonth)
  const [isSelectedYear, setIsSelectedYear] = useState(currentYear);
  const [isSelectedMonth, setIsSelectedMonth] = useState(monthLetter[0].name);
  console.log("infoLIST", info)
  const balance = info.reduce((acc, data) => {
    if (data.type === false) {
      return acc + Number(data.amount);
    } else if (data.type === true) {
      return acc - Number(data.amount);
    }
    return acc;
  }, 0);

   //const filterYearsForSelection = info.filter(data => data.year === isSelectedYear)
   //const arrayMonthInSelectedYear = filterYearsForSelection.filter(data => data.month === isSelectedMonth)


  const arrDataToDisplay = info.filter(data => {
   return currentMonth === data.date.split("-")[1]
  })




  return (
    <section className={style.listCards}>
      <div className={style.totalSum}>
        <span>
          Balance:{' '}<br/>
          <span
            style={{
              color: balance <= 0 ? '#be242496' : 'rgb(194, 240, 126)',
              fontWeight: 900,
            }}
          > {' '}{new Intl.NumberFormat('fr-FR').format(balance.toFixed(2))}
          </span>
          {' '}RON
        </span>

        
      </div>

        <ModalTime
          initialValue={isSelectedYear}
          info={info}
          //handleYear={handleYear}
          //handleMonth={handleMonth}
          name="years"
        />

        <ModalTime
          initialValue={isSelectedMonth}
          info={info}
          //handleMonth={handleMonth}
          name="months"
        />

      {arrDataToDisplay.map((data,index) => (
        <Card data={data} key={index+1} handleDeleteCard={handleDeleteCard} id={index+1} />
      ))}
      <Link
        to="/newCard"
        className={style.addCardButton}
      >
        <IoAddSharp />
      </Link>
    </section>
  );
};

export default ListCards;

//<button type='button' className={`${style.addCard} ${style.selectedBtn}`}><IoAddSharp/></button>
