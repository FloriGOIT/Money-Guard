import style from './moneyGuard.module.scss';
import currency from 'helpers/currencyBNR';
import { Link } from 'react-router-dom';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';

const CurrencyTable = () => {
  return (
    <div className={style.currencyTable}>
      <div className={style.currencyTableHeader}>
        <span>NBR</span>
        <span>Buy</span>
        <span>Sell</span>
      </div>
      {currency.map(currency => {
        const location = `/currency/${currency.currencyName}`;
        return (
          <div className={style.currencyTableRow} key={currency.currencyName}>

            <span className={style.currencyTableNotRate}>
              {currency.currencyName}
            </span>
            <span className={style.currencyTableRate}>
              {Number(currency.nbrRate).toFixed(4)}
            </span>
            <span className={style.currencyTableRate}>
              {Number(currency.buyRate).toFixed(4)}
            </span>
            <span className={style.currencyTableRate}>
              {Number(currency.sellRate).toFixed(4)}
            </span>

                        <button type="button" className={style.deletCurrency}>
              {' '}
              <MdDeleteOutline />{' '}
            </button>
                        <Link to={location} className={style.editCurrency}>
              {' '}
              <MdOutlineModeEdit />{' '}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CurrencyTable;
