import style from './moneyGuard.module.scss';
import currencyBNR from 'helpers/currencyBNR';
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
      {currencyBNR.map(currency => (
        <div className={style.currancyTableRow} key={currency.name}>
          <span>{currency.name}</span>
          <span>{currency.NBR}</span>
          <span>{currency.buy}</span>
          <span>{currency.sell}</span>
          <Link to="/currency/newCoin" className={style.editCurrency}> <MdOutlineModeEdit /></Link>

        </div>
      ))}
    </div>
  );
};

export default CurrencyTable;
