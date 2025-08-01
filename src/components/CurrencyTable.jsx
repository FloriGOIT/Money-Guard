import style from './moneyGuard.module.scss';
import currency from 'helpers/currencyBNR';
import { Link} from 'react-router-dom';

import { MdOutlineModeEdit } from 'react-icons/md';

const CurrencyTable = () => {

  return (
    <div className={style.currencyTable}>  
      <div className={style.currancyTableHeader}>
        <span className={style.currancyTableNotRate}></span>
        <span className={style.currancyTableRate}>NBR</span>
        <span className={style.currancyTableRate}>Buy</span>
        <span className={style.currancyTableRate}>Sell</span>
        <span className={style.currancyTableNotRate}></span>
      </div>
      {currency.map(currency => {
        const location = `/currency/${currency.currencyName}`;
        return (<div className={style.currancyTableRow} key={currency.currencyName}>
          <span className={style.currancyTableNotRate}>{currency.currencyName}</span>
          <span className={style.currancyTableRate}>{Number(currency.nbrRate).toFixed(4)}</span>
          <span className={style.currancyTableRate}>{Number(currency.buyRate).toFixed(4)}</span>
          <span className={style.currancyTableRate}>{Number(currency.sellRate).toFixed(4)}</span>
          <Link to={location} className={style.editCurrency}> <MdOutlineModeEdit /></Link>
        </div>)
      })}
    </div>
  );
};

export default CurrencyTable;
