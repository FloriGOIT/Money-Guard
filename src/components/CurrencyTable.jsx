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
      {currency.map(currency => {
        const location = `/currency/${currency.currencyName}`;
        return (<div className={style.currancyTableRow} key={currency.currencyName}>
          <span>{currency.currencyName}</span>
          <span>{Number(currency.nbrRate).toFixed(4)}</span>
          <span>{Number(currency.buyRate).toFixed(4)}</span>
          <span>{Number(currency.sellRate).toFixed(4)}</span>
          <Link to={location} className={style.editCurrency}> <MdOutlineModeEdit /></Link>
        </div>)
      })}
    </div>
  );
};

export default CurrencyTable;
