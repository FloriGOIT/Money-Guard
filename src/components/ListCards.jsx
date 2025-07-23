import dataCard from '../helpers/dataCard';
import style from './moneyGuard.module.scss';
import Card from './Card';
import { nanoid } from 'nanoid';
import { IoAddSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const ListCards = () => {
  const balance = dataCard.reduce((acc, data) => {
    if (data.type === 'Income') {
      return acc + data.sum;
    } else if (data.type === 'Expense') {
      return acc - data.sum;
    }
    return acc;
  }, 0);
  const currentMonth = (new Date().getMonth()+1).toString().padStart(2, '0');

  const arrDataToDisplay = dataCard.filter(data => {
   return currentMonth === data.date.split("-")[1]
  })
console.log("arrDataToDisplay",arrDataToDisplay)

  return (
    <section className={style.listCards}>
      <div className={style.totalSum}>
        <span>
          Balance:{' '}
          <span
            style={{
              color: balance <= 0 ? '#be242496' : 'rgb(194, 240, 126)',
              fontWeight: 900,
            }}
          > {' '}{new Intl.NumberFormat('fr-FR').format(balance)}
          </span>
          {' '}RON
        </span>
      </div>
      {arrDataToDisplay.map(data => (
        <Card data={data} key={nanoid()} />
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
