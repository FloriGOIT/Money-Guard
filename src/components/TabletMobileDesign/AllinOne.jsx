import style from '../moneyGuard.module.scss';
import currency from 'helpers/currencyBNR';
import { useState,useEffect } from 'react';
import Balance from 'components/Balance';
import CurrencyAll from './CurrencyAll';
import ListCardsAll from 'components/TabletMobileDesign/ListCardsAll';
import ModalTimeAll from 'components/TabletMobileDesign/ModalTimeAll';
import NavAll from 'components/TabletMobileDesign/NavAll';
import NewCoinFormAll from './NewCoinFormAll';
import { currentYear, currentMonthLetter } from '../../helpers/timeInfo';

const AllinOne = ({ info }) => {
  const currenciesLocalStorage = localStorage.getItem("moneyGuardCurrency");
  const currenciesParces = JSON.parse(currenciesLocalStorage)
  const [isHomeNavSelected, setIsHomeNavSelected] = useState(false);
  const [isListCurrencies, setIsListCurrencies] = useState(currenciesParces || currency);
  const [isNewCoinModalOn, setisNewCoinModalOn] = useState(false);
  const [isIdForCoinUpdate, setIsIdForCoinUpdate] = useState("")
  
  useEffect(() => {
 localStorage.setItem("moneyGuardCurrency", JSON.stringify(isListCurrencies))
}, [isListCurrencies])


  const handleAddNewCoin = value => {
    if (!isIdForCoinUpdate) { setIsListCurrencies(prev => [...prev, value]) }
    else {
      const findIndex = isListCurrencies.findIndex(el=>el.id===isIdForCoinUpdate)
      isListCurrencies.splice(findIndex,1,value)
      setIsListCurrencies(isListCurrencies)
    }
    
    setisNewCoinModalOn(prev=> !prev)
  }
  
  const [isYearMonthForFilter, setisYearMonthForFilter] = useState({
    year: currentYear,
    month: currentMonthLetter,
  });
  //

  const handleYearMonth = value => setisYearMonthForFilter(value);
  const handleNav = () => setIsHomeNavSelected(pre => !pre);
  const handleAddCoinModal = () => setisNewCoinModalOn(prev => !prev);
  const handleIdForCoinUpdate = id => {setIsIdForCoinUpdate(id);handleAddCoinModal()}
  
  return (
    <section className={style.allinOneWrapper}>

        <div className={style.allinOneContainerPermanent}>
          <NavAll isHomeSelected={isHomeNavSelected} handleNav={handleNav} />
          <Balance info={info} />
        <CurrencyAll handleAddCoinModal={handleAddCoinModal} listCurrencies={isListCurrencies} handleIdForCoinUpdate={handleIdForCoinUpdate} />
        </div>
        <div className={style.allinOneContainerRight}>
          <ModalTimeAll info={info} handleYearMonth={handleYearMonth} />
          <ListCardsAll
            info={info}
            isYearMonthForFilter={isYearMonthForFilter}
          />
      </div>
     {isNewCoinModalOn? <div className={style.newCoinAllFormContainer}>
        <NewCoinFormAll handleAddNewCoin={handleAddNewCoin} handleAddCoinModal={handleAddCoinModal} isIdForCoinUpdate={isIdForCoinUpdate} isListCurrencies={isListCurrencies} /> 
      </div> : null}
    </section>
  );
};

export default AllinOne;

//      <NewCoinAll />       
