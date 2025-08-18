import style from '../moneyGuard.module.scss';
import { useState,useEffect } from 'react';
import { nanoid } from 'nanoid';
import BigBtnWithColorAll from './BigBtnWithColorAll';
import BigBtnNoColorAll from './BigBtnNoColorAll';

const NewCoinFormAll = ({
  handleAddNewCoin,
  handleAddCoinModal,
  isIdForCoinUpdate,
  isListCurrencies,
}) => {

  const [isCurrency, setIsCurrency] = useState({
      id: nanoid(),
      currencyName: '',
      nbrRate: '',
      buyRate: '',
      sellRate: '',
    });



  useEffect(() => {
      const coinToBeUpdated = isListCurrencies.find(
    el => el.id === isIdForCoinUpdate
    );
    
    if (isIdForCoinUpdate) {
    setIsCurrency(coinToBeUpdated);
  } },[isIdForCoinUpdate, isListCurrencies])


  const handleSubmit = e => {
    e.preventDefault();
    handleAddNewCoin(isCurrency);
  };
  return (
    <form className={style.newCoinAllForm} onSubmit={handleSubmit}>
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
        pattern="^\d{1,3}(\.\d{1,4})?$"
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
        pattern="^\d{1,3}(\.\d{1,4})?$"
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
        pattern="^\d{1,3}(\.\d{1,4})?$"
        title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
        value={isCurrency.sellRate}
        required
        autoComplete="off"
        placeholder="Sell rate"
        onChange={e =>
          setIsCurrency(prev => ({ ...prev, sellRate: e.target.value }))
        }
      />
      <div className={style.bigButtons}>
        <BigBtnWithColorAll valueBtn="Save" type="submit" />
        <BigBtnNoColorAll
          valueBtn="Close"
          handleAddCoinModal={handleAddCoinModal}
        />
      </div>
    </form>
  );
};

export default NewCoinFormAll;
