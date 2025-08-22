import style from '../moneyGuard.module.scss';
import currency from 'helpers/currencyBNR';
import { useState,useEffect } from 'react';
import Balance from 'components/Balance';
import CurrencyAll from './CurrencyAll';
import ListCardsAll from 'components/TabletMobileDesign/ListCardsAll';
import ModalTimeAll from 'components/TabletMobileDesign/ModalTimeAll';
import NavAll from 'components/TabletMobileDesign/NavAll';
import NewCoinFormAll from './NewCoinFormAll';
import NewCardFormAll from './NewCardFormAll';
import { currentYear, currentMonthLetter } from '../../helpers/timeInfo';

const AllinOne = ({ info }) => {
  const currenciesLocalStorage = localStorage.getItem("moneyGuardCurrency");
  const currenciesParces = JSON.parse(currenciesLocalStorage)
  const [isHomeNavSelected, setIsHomeNavSelected] = useState(false);
  const [isListCurrencies, setIsListCurrencies] = useState(currenciesParces || currency);
  const [isNewCoinModalOn, setIsNewCoinModalOn] = useState(false);
  const [isNewCardModalOn, setIsNewCardModalOn] = useState(false);
  const [isIdForCoinUpdate, setIsIdForCoinUpdate] = useState("")
 
  useEffect(() => {
 localStorage.setItem("moneyGuardCurrency", JSON.stringify(isListCurrencies))
}, [isListCurrencies])


  const handleAddNewCoin = value => {
    if (!isIdForCoinUpdate) { setIsListCurrencies(prev => [...prev, value]) }
    else {
      const findIndex = isListCurrencies.findIndex(el=>el.id===isIdForCoinUpdate)
      isListCurrencies.splice(findIndex, 1, value);
      setIsListCurrencies(isListCurrencies);
      setIsIdForCoinUpdate("");
    }
    
    setIsNewCoinModalOn(prev=> !prev)
  }
  
  const [isYearMonthForFilter, setisYearMonthForFilter] = useState({
    year: currentYear,
    month: currentMonthLetter,
  });
  //

  const handleYearMonth = value => setisYearMonthForFilter(value);
  const handleNav = () => setIsHomeNavSelected(pre => !pre);
  const handleAddCoinModal = () => setIsNewCoinModalOn(prev => !prev);
  const handleIdForCoinUpdate = id => {setIsIdForCoinUpdate(id);handleAddCoinModal()}
  const handleIdForCoinDel = id => {
  const newListCurrency = isListCurrencies.filter(el => el.id !== id);
    setIsListCurrencies(newListCurrency)
  }
  const handleAddCardModal = () => setIsNewCardModalOn(prev => !prev);

  return (
    <section className={style.allinOneWrapper}>

        <div className={style.allinOneContainerLeft}>
          <NavAll isHomeSelected={isHomeNavSelected} handleNav={handleNav} />
          <Balance info={info} />
        <CurrencyAll handleAddCoinModal={handleAddCoinModal} listCurrencies={isListCurrencies} handleIdForCoinUpdate={handleIdForCoinUpdate} handleIdForCoinDel={handleIdForCoinDel} />
        </div>
        <div className={style.allinOneContainerRight}>
          <ModalTimeAll info={info} handleYearMonth={handleYearMonth} />
          <ListCardsAll handleAddCardModal={handleAddCardModal}
            info={info}
            isYearMonthForFilter={isYearMonthForFilter}
          />
      </div>
     {isNewCoinModalOn? <div className={style.newCoinFormAllModal}>
        <NewCoinFormAll handleAddNewCoin={handleAddNewCoin} handleAddCoinModal={handleAddCoinModal} isIdForCoinUpdate={isIdForCoinUpdate} isListCurrencies={isListCurrencies} /> 
      </div> : null}
      {isNewCardModalOn ? <div className={style.newCardFormAllModal} ><NewCardFormAll handleAddCardModal={handleAddCardModal} info={info} /></div> : null }
    </section>
  );
};

export default AllinOne;

//      <NewCoinAll />       
