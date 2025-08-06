import style from './moneyGuard.module.scss';
import currency from 'helpers/currencyBNR';
import { Link } from 'react-router-dom';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { useEffect, useState } from 'react';

const CurrencyTable = () => {

  const [arrCurrency, setArrCurrency] = useState([]);

  useEffect(() => {
    const localStorageArr = JSON.parse(localStorage.getItem("moneyGuardCurrency"));
    console.log("localStorageArr",localStorageArr)
    if (!localStorageArr) { localStorage.setItem("moneyGuardCurrency", JSON.stringify(currency)) }
    setArrCurrency(localStorageArr)
  },[])

  const handleCoinDelete = value => {
    const newArrCurrency = arrCurrency.filter(coin => coin.currencyName !== value); setArrCurrency(newArrCurrency)
    localStorage.setItem("moneyGuardCurrency",JSON.stringify(newArrCurrency))
  }
  return (
    <div className={style.currencyTable}>
      <div className={style.currencyTableHeader}>
        <span>NBR</span>
        <span>Buy</span>
        <span>Sell</span>
      </div>
      {arrCurrency.map(currency => {
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

            <button type="button" className={style.deletCurrency} onClick={()=>handleCoinDelete(currency.currencyName)}>
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


