import style from '../moneyGuard.module.scss';
import BigButtonsContainer from '../BigButtonsContainer';
import {useState } from 'react';
import { nanoid } from 'nanoid';


const NewCoinFormAll = ({handleAddCoin}) => {
  const [isCurrency, setIsCurrency] = useState({
    id:nanoid(),
    currencyName: '',
    nbrRate: "",
    buyRate: "",
    sellRate: "",
  });


  /*const handleSubmit = e => {

    e.preventDefault();
    const localStorageArr = JSON.parse(localStorage.getItem("moneyGuardCurrency"));
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

  };
  */

  return (

        <form className={style.newCoinAllForm} >
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
            <BigButtonsContainer firstBtn="Add" secondBtn="Close"/>
          </div>
        </form>
  );
};

export default NewCoinFormAll;

/*

*/
