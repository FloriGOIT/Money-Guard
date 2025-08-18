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
  
  useEffect(() => {
 localStorage.setItem("moneyGuardCurrency", JSON.stringify(isListCurrencies))
}, [isListCurrencies])


  const handleAddNewCoin = value => {
    setIsListCurrencies(prev => [...prev, value]);
    setisNewCoinModalOn(prev=> !prev)
  }
  
  const [isYearMonthForFilter, setisYearMonthForFilter] = useState({
    year: currentYear,
    month: currentMonthLetter,
  });
  //

  const handleYearMonth = value => setisYearMonthForFilter(value);
  const handleNav = () => setIsHomeNavSelected(pre => !pre);
  const handleAddCoinModal = () => setisNewCoinModalOn(prev=> !prev)

  return (
    <section className={style.allinOneWrapper}>

        <div className={style.allinOneContainerPermanent}>
          <NavAll isHomeSelected={isHomeNavSelected} handleNav={handleNav} />
          <Balance info={info} />
        <CurrencyAll handleAddCoinModal={handleAddCoinModal} listCurrencies={isListCurrencies} />
        </div>
        <div className={style.allinOneContainerRight}>
          <ModalTimeAll info={info} handleYearMonth={handleYearMonth} />
          <ListCardsAll
            info={info}
            isYearMonthForFilter={isYearMonthForFilter}
          />
      </div>
     {isNewCoinModalOn? <div className={style.newCoinAllFormContainer}>
        <NewCoinFormAll handleAddNewCoin={handleAddNewCoin} handleAddCoinModal={handleAddCoinModal} /> 
      </div> : null}
    </section>
  );
};

export default AllinOne;

//      <NewCoinAll />       
