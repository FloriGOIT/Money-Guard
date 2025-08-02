import style from './moneyGuard.module.scss';
import BigButtonsContainer from './BigButtonsContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';


const NewCoin = () => {
  const [isCurrency, setIsCurrency] = useState({
    id:nanoid(),
    currencyName: '',
    nbrRate: "",
    buyRate: "",
    sellRate: "",
  });

  const navigate = useNavigate();
  const param = useParams().name;

  useEffect(() => {

     const localStorageArr = JSON.parse(localStorage.getItem("moneyGuardCurrency"));
    if (param) {
      const newCurrency = localStorageArr.find(c => c.currencyName === param);
      if (newCurrency) setIsCurrency(newCurrency);
    }
  }, [param]);

  console.log("isCurrency",isCurrency)

  const handleSubmit = e => {

    e.preventDefault();

    const localStorageArr = JSON.parse(localStorage.getItem("moneyGuardCurrency"));

    if (!param){const checkDuplicateCurrency = localStorageArr.find(c => c.currencyName === isCurrency.currencyName);
    if (checkDuplicateCurrency) {
      alert("This currency is already available. Enter other name or cancel request."); return
    }}

    const index = localStorageArr.findIndex(c => c.id === isCurrency.id);
    console.log("index",index)
    if (index !== -1) {
      localStorageArr[index] = isCurrency;
    } else {
      localStorageArr.push(isCurrency); 
    };

    localStorage.setItem("moneyGuardCurrency", JSON.stringify(localStorageArr))

    setIsCurrency({
      id:nanoid(),
      currencyName: '',
      nbrRate: '',
      buyRate: '',
      sellRate: '',
    });

    navigate('/currency');
  };

  return (
    <section className={style.newCoinWrapper}>
      <div className={style.newCoinContainer}>
        <form className={style.newCoinForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="currencyName"
            pattern="^[A-Za-z]{3}$"
            title="Enter exactly 3 letters.Example: USD, RON, EUR"
            value={isCurrency.currencyName}
            required
            autoComplete="off"
            placeholder="Currency name"
            onChange={e =>
              setIsCurrency(prev => ({
                ...prev,
                currencyName: e.target.value.toUpperCase(),
              }))
            }
          />
          <input
            type="text"
            name="nbrRate"
            pattern="^\d+(\.\d{1,4})?$"
            title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
            value={isCurrency.nbrRate}
            required
            autoComplete="off"
            placeholder="Central bank rate"
            onChange={e =>
              setIsCurrency(prev => ({ ...prev, nbrRate: e.target.value }))
            }
          />
          <input
            type="text"
            name="buyRate"
            pattern="^\d+(\.\d{1,4})?$"
            title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
            value={isCurrency.buyRate}
            required
            autoComplete="off"
            placeholder="Buy rate"
            onChange={e =>
              setIsCurrency(prev => ({ ...prev, buyRate: e.target.value }))
            }
          />
          <input
            type="text"
            name="sellRate"
            pattern="^\d+(\.\d{1,4})?$"
            title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
            value={isCurrency.sellRate}
            required
            autoComplete="off"
            placeholder="Sell rate"
            onChange={e =>
              setIsCurrency(prev => ({ ...prev, sellRate: e.target.value }))
            }
          />
          <div className={style.newCoinFormButtons}>
            <BigButtonsContainer firstBtn={param? "Update" : "Add"} secondBtn="Close" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewCoin;

/*
    const checkDuplicateCurrency = currency.find(currency => currency.currencyName === isCurrency.currencyName);
    if (checkDuplicateCurrency) {
      alert("This currency is already available. Enter other name or cancel request."); return
    }
*/
