import style from './moneyGuard.module.scss';
import BigButtonsContainer from './BigButtonsContainer';
import currency from 'helpers/currencyBNR';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NewCoin = () => {
  const navigation = useNavigate();
  const [isCurrency, setIsCurrency] = useState("")
  //console.log("isCurrency",isCurrency)
 const matchCurrency = currency.find(currency => currency.currencyName === isCurrency);
    //console.log("matchCurrency",matchCurrency)
  const handleNewCoin = e => {
    e.preventDefault();
    const form = e.target;
    const currencyName = form.elements.currencyName.value.toUpperCase();
    if (matchCurrency) {
      alert("This currency is already available. Enter other name or cancel request."); return
    }
    const nbrRate= form.elements.nbrRate.value;
    const buyRate= form.elements.buyRate.value;
    const sellRate= form.elements.sellRate.value;
    const newCoin = {currencyName,nbrRate,buyRate,sellRate}
    currency.push(newCoin);
    form.reset();
    navigation("/currency")
  };

  return (
    <section className={style.newCoinWrapper}>
      <div className={style.newCoinContainer}>
        <form onSubmit={e => handleNewCoin(e)} className={style.newCoinForm}>
          <input
            type="text"
            name="currencyName"
            pattern="^[A-Za-z]{3}$"
            title="Enter exactly 3 letters.Example: USD, RON, EUR"
            required
            autoComplete="off"
            placeholder="Currency name"
            onChange={e=>setIsCurrency(e.target.value.toUpperCase())}
          />
          <input
            type="text"
            name="nbrRate"
            pattern="^\d+(\.\d{1,4})?$"
            title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
            required
            autoComplete="off"
            placeholder="Central bank rate"
          />
          <input
            type="text"
            name="buyRate"
            pattern="^\d+(\.\d{1,4})?$"
            title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
            required
            autoComplete="off"
            placeholder="Buy rate"
          />
          <input
            type="text"
            name="sellRate"
            pattern="^\d+(\.\d{1,4})?$"
            title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
            required
            autoComplete="off"
            placeholder="Sell rate"
          />
          <div className={style.newCoinFormButtons}>
            <BigButtonsContainer firstBtn="Add" secondBtn="Close" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewCoin;
