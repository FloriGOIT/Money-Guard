import style from '../components/moneyGuard.module.scss';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { ImMinus } from 'react-icons/im';
import { PiPlusMinusBold } from 'react-icons/pi';
import { ImPlus } from 'react-icons/im';

const ListCardsTablet = ({ info }) => {
  return (
    <div className={style.listCardsTabletContainer}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>
              <PiPlusMinusBold />
            </th>
            <th>Category</th>
            <th>Comment</th>
            <th>Sum</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {info.map(card => (
            <tr key={card.id}>
              <td className={style.cardDate}>{card.date}</td>
              <td className={style.cardType}>
                {card.type ? <ImPlus /> : <ImMinus />}
              </td>
              <td className={style.cardCategory}>{card.category}</td>
              <td className={style.cardDetails}>{card.details}</td>
              <td className={style.cardAmount}>{card.amount}</td>
              <td className={style.cardButton}>
                <div className={style.deletCurrency}>
                  <MdDeleteOutline />
                </div>
              </td>
              <td className={style.cardButton}>
                <div className={style.editCurrency}>
                  <MdOutlineModeEdit />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCardsTablet;

/* <tbody></tbody>




<table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Comment</th>
          <th>Sum</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} style={{ backgroundColor: item.color }}>
            <td>{item.date}</td>
            <td>{item.type ? 'Income' : 'Expense'}</td>
            <td>{item.category}</td>
            <td>{item.details}</td>
            <td>{item.amount}</td>
            <td>
              <button>Edit</button>
            </td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

*/
