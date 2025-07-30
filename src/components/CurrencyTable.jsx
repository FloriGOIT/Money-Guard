import style from './moneyGuard.module.scss';
import currencyBNR from 'helpers/currencyBNR';

const CurrencyTable = () => {
  return (
    <div className={style.currencyContainer}>
      <div className={style.currancyTableHeader}>
        <span>Currency</span>
        <span>NBR</span>
        <span>Buy rate</span>
        <span>Sell rate</span>
      </div>
      {currencyBNR.map(currency => (
        <div className={style.currancyTableRow} key={currency.name}>
          <span>{currency.name}</span>
          <span>{currency.NBR}</span>
                      <span>{currency.buy}</span>
                      <span>{currency.sell}</span>
        </div>
      ))}
    </div>
  );
};

export default CurrencyTable;
