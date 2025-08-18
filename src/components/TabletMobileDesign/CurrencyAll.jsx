import style from '../moneyGuard.module.scss';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import AddButton from './AddButton';


const CurrencyAll = ({ listCurrencies, handleAddCoinModal }) => {
  
  return (
    <table className={style.currencyTableAll}>
      <thead>
        <tr>
          <th className={style.nonRate}></th>
          <th className={style.withRate}>NBR</th>
          <th className={style.withRate}>Buy</th>
          <th className={style.withRate}>Sell</th>
          <th onClick={handleAddCoinModal}><AddButton/></th>
        </tr>
      </thead>
      <tbody>
        {listCurrencies.map(el => (
          <tr key={el.id}>
                        <td className={style.nonRate}>{el.currencyName}</td>
            <td className={style.withRate}>{el.nbrRate}</td>
            <td className={style.withRate}>{el.buyRate}</td>
            <td className={style.withRate}>{el.sellRate}</td>
            <td className={style.smallBtn} style={{paddingLeft:"5px"}}>
                <div className={style.deletCurrency}>
                  <MdDeleteOutline />
                </div>
              </td>
              <td className={style.smallBtn} style={{paddingLeft:"10px"}}>
                <div className={style.editCurrency}>
                  <MdOutlineModeEdit />
                </div>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyAll;

