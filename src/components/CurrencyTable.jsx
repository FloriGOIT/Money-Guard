import style from './moneyGuard.module.scss';
import currency from 'helpers/currencyBNR';
import { Link} from 'react-router-dom';

import { MdOutlineModeEdit } from 'react-icons/md';

const CurrencyTable = () => {
  return (
    <div className={style.currencyTable}>  
      <div className={style.currancyTableHeader}>
        <span></span>
        <span>NBR</span>
        <span>Buy</span>
        <span>Sell</span>
        <span></span>
      </div>
      {currency.map(currency => (
        <div className={style.currancyTableRow} key={currency.currencyName}>
          <span>{currency.currencyName}</span>
          <span>{currency.nbrRate}</span>
          <span>{currency.buyRate}</span>
          <span>{currency.sellRate}</span>
          <Link to="/currency/newCoin" className={style.editCurrency}> <MdOutlineModeEdit /></Link>

        </div>
      ))}
    </div>
  );
};

export default CurrencyTable;
