
import style from './moneyGuard.module.scss';
import Card from './Card';
import { IoAddSharp } from 'react-icons/io5';
import { Link} from 'react-router-dom';


const ListCards = ({info,handleDeleteCard}) => {
  const balance = info.reduce((acc, data) => {
    if (data.type === 'Income') {
      return acc + Number(data.sum);
    } else if (data.type === 'Expense') {
      return acc - Number(data.sum);
    }
    return acc;
  }, 0);
  const currentMonth = (new Date().getMonth()+1).toString().padStart(2, '0');

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
