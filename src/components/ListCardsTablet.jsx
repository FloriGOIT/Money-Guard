import style from '../components/moneyGuard.module.scss';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { ImMinus } from 'react-icons/im';
import { PiPlusMinusBold } from 'react-icons/pi';
import { ImPlus } from 'react-icons/im';

const ListCardsTablet = ({ info }) => {
  const year2025 = info.filter(item => Number(item.year) === 2025)
  const august2025Arr = year2025.filter(item => item.month === "August")
  console.log("august2025Arr",august2025Arr)
  return (
    <div className={style.listCardsTabletContainer}>
      <table>
        <thead>
          <tr>
            <th  style={{width: "100px"}}>Date</th>
            <th className={style.piPlusMinusBold}>
              <PiPlusMinusBold />
            </th>
            <th style={{width: "100px"}}>Category</th>
            <th style={{width: "340px"}}>Comment</th>
            <th style={{width: "100px"}}>Sum</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {info.map(card => (
            <tr key={card.id} >
              <td className={style.cardDate} style={{width: "100px"}}>{card.date}</td>
              <td className={style.cardType}>
                {card.type ? <ImPlus className={style.imPlus}/> : <ImMinus className={style.imMinus}/>}
              </td>
              <td className={style.cardCategory} style={{width: "100px"}}>{card.category}</td>
              <td className={style.cardDetails} style={{width: "340px", color: "wheat"}}>{card.details}</td>
              <td className={style.cardAmount} style={{width: "80px"}}>{card.amount}</td>
              <td className={style.cardButton} style={{padding:"0px 5px 5px 5px"}}>
                <div className={style.deletCurrency}>
                  <MdDeleteOutline />
                </div>
              </td>
              <td className={style.cardButton} style={{padding:"0px 5px 5px 5px"}}>
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
