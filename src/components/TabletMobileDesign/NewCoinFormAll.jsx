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

  const [isCoin, setIsCoin] = useState({
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
    setIsCoin(coinToBeUpdated);
  } },[isIdForCoinUpdate, isListCurrencies])


  const handleSubmit = e => {
    e.preventDefault();
    handleAddNewCoin(isCoin);
  };
  return (
    <form className={style.newCoinAllForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="currencyName"
        pattern="^[A-Za-z]{3}$"
        title="Enter exactly 3 letters.Example: USD, RON, EUR"
        value={isCoin.currencyName}
        required
        autoComplete="off"
        placeholder="Currency name"
        onChange={e =>
          setIsCoin(prev => ({
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
        value={isCoin.nbrRate}
        required
        autoComplete="off"
        placeholder="Central bank rate"
        onChange={e =>
          setIsCoin(prev => ({ ...prev, nbrRate: e.target.value }))
        }
      />
      <input
        type="text"
        name="buyRate"
        pattern="^\d{1,3}(\.\d{1,4})?$"
        title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
        value={isCoin.buyRate}
        required
        autoComplete="off"
        placeholder="Buy rate"
        onChange={e =>
          setIsCoin(prev => ({ ...prev, buyRate: e.target.value }))
        }
      />
      <input
        type="text"
        name="sellRate"
        pattern="^\d{1,3}(\.\d{1,4})?$"
        title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
        value={isCoin.sellRate}
        required
        autoComplete="off"
        placeholder="Sell rate"
        onChange={e =>
          setIsCoin(prev => ({ ...prev, sellRate: e.target.value }))
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
