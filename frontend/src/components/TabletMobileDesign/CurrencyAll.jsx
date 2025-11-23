import style from '../moneyGuard.module.scss';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import AddButton from './AddButton';

const CurrencyAll = ({
  listCurrencies,
  handleAddCoinModal,
  handleIdForCoinUpdate,
  handleIdForCoinDel,
}) => {
 const fourDecimalsNumber = value =>{ return new Intl.NumberFormat('fr-FR', { 
  minimumFractionDigits: 4, 
  maximumFractionDigits: 4 
 }).format(Number(value));
  } 
  console.log("listCurrencies",listCurrencies)
  return (
    <div className={style.preCurrencyTableAll}>
      <table className={style.currencyTableAll}>
        <thead>
          <tr>
            <th className={style.nonRate}></th>
            <th className={style.withRate}>NBR</th>
            <th className={style.withRate}>Buy</th>
            <th className={style.withRate}>Sell</th>
            <th onClick={handleAddCoinModal}>
              <AddButton />
            </th>
          </tr>
        </thead>
        <tbody>
          {listCurrencies.map(coin => (
            <tr key={coin.currencyName}>
              <td className={style.nonRate}>{coin.currencyName}</td>
              <td className={style.withRate}>
                {fourDecimalsNumber(coin.nbrRate)}
              </td>
              <td className={style.withRate}>
                {fourDecimalsNumber(coin.buyRate)}
              </td>
              <td className={style.withRate}>
                {fourDecimalsNumber(coin.sellRate)}
              </td>
              <td
                className={style.smallBtn}
                style={{ paddingLeft: '5px' }}
                onClick={() => handleIdForCoinDel(coin.idCoinFront)}
              >
                <div className={style.deletCurrency}>
                  <MdDeleteOutline />
                </div>
              </td>
              <td
                className={style.smallBtn}
                style={{ paddingLeft: '10px' }}
                onClick={() => handleIdForCoinUpdate(coin.idCoinFront)}
              >
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

export default CurrencyAll;
