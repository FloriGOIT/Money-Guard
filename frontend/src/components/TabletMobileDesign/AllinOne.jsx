import style from '../moneyGuard.module.scss';
import currency from '../../helpers/currencyBNR';
import { useState, useEffect } from 'react';
import Balance from '../../components/Balance';
import CurrencyAll from './CurrencyAll';
import ListCardsAll from '../../components/TabletMobileDesign/ListCardsAll';
import ModalTimeAll from '../../components/TabletMobileDesign/ModalTimeAll';
import NavAll from '../../components/TabletMobileDesign/NavAll';
import NewCoinFormAll from './NewCoinFormAll';
import NewCardFormAll from './NewCardFormAll';
import { currentYear, currentMonthLetter } from '../../helpers/timeInfo';
import StatisticsAll from './StatisticsAll';
import Header from '../../components/Header';

const AllinOne = ({ info, handleDeleteCard }) => {

  const currenciesLocalStorage = localStorage.getItem('moneyGuardCurrency');
  const currenciesParces = JSON.parse(currenciesLocalStorage);
  const [isHomeNavSelected, setIsHomeNavSelected] = useState(true);
  const [isListCurrencies, setIsListCurrencies] = useState(
    currenciesParces || currency
  );
  const [isNewCoinModalOn, setIsNewCoinModalOn] = useState(false);
  const [isNewCardModalOn, setIsNewCardModalOn] = useState(false);
  const [isIdForCoinUpdate, setIsIdForCoinUpdate] = useState('');
  const [isIdForCardUpdate, setIsIdForCardUpdate] = useState('');
  useEffect(() => {
    localStorage.setItem(
      'moneyGuardCurrency',
      JSON.stringify(isListCurrencies)
    );
  }, [isListCurrencies]);

  const handleAddNewCoin = value => {
    if (!isIdForCoinUpdate) {
      setIsListCurrencies(prev => [...prev, value]);
    } else {
      const findIndex = isListCurrencies.findIndex(
        el => el.id === isIdForCoinUpdate
      );
      isListCurrencies.splice(findIndex, 1, value);
      setIsListCurrencies(isListCurrencies);
      setIsIdForCoinUpdate('');
    }
    
    setIsNewCoinModalOn(prev => !prev);
    
  };

  const [isYearMonthForFilter, setisYearMonthForFilter] = useState({
    year: currentYear,
    month: currentMonthLetter,
  });
  //

  const handleYearMonth = value => setisYearMonthForFilter(value);
  const handleNav = () => setIsHomeNavSelected(pre => !pre);
  const handleAddCoinModal = () => setIsNewCoinModalOn(prev => !prev);
  const handleIdForCoinUpdate = id => {
    setIsIdForCoinUpdate(id);
    handleAddCoinModal();
  };
  const handleIdForCardUpdate = id => setIsIdForCardUpdate(id);
  const handleIdForCoinDel = id => {
    const newListCurrency = isListCurrencies.filter(el => el.id !== id);
    setIsListCurrencies(newListCurrency);
    setIsIdForCoinUpdate('');
  };
  const handleAddCardModal = () => setIsNewCardModalOn(prev => !prev);

  return (
    <section className={style.allinOneWrapper}>
      <section className={style.sharedLayoutWrapper}>
        <Header  />
      </section>
      
      <div className={style.notSharedLayout}>
        <div className={style.allinOneContainerLeft}>
          <div className={style.navAndBalance}>
            <NavAll isHomeSelected={isHomeNavSelected} handleNav={handleNav} />

            <div className={style.preBalance}>
              <Balance info={info} />
            </div>
          </div>

          <CurrencyAll
            handleAddCoinModal={handleAddCoinModal}
            listCurrencies={isListCurrencies}
            handleIdForCoinUpdate={handleIdForCoinUpdate}
            handleIdForCoinDel={handleIdForCoinDel}
          />
        </div>

        <div className={style.allinOneContainerRight}>
          {isHomeNavSelected ? (
            <section className={style.homeSection}>
              <ModalTimeAll info={info} handleYearMonth={handleYearMonth} />
              <ListCardsAll
                handleAddCardModal={handleAddCardModal}
                handleDeleteCard={handleDeleteCard}
                handleIdForCardUpdate={handleIdForCardUpdate}
                info={info}
                isYearMonthForFilter={isYearMonthForFilter}
              />
            </section>
          ) : (
            <section className={style.statisticsSection}>
              <StatisticsAll
                info={info}
                handleYearMonth={handleYearMonth}
                isYearMonthForFilter={isYearMonthForFilter}
              />
            </section>
          )}
        </div>

        {isNewCoinModalOn ? (
          <div className={style.newCoinFormAllModal}>
            <NewCoinFormAll
              handleAddNewCoin={handleAddNewCoin}
              handleAddCoinModal={handleAddCoinModal}
              isIdForCoinUpdate={isIdForCoinUpdate}
              isListCurrencies={isListCurrencies}
            />
          </div>
        ) : null}
        {isNewCardModalOn ? (
          <div className={style.newCardFormAllModal}>
            <NewCardFormAll
              handleIdForCardUpdate={handleIdForCardUpdate}
              handleAddCardModal={handleAddCardModal}
              info={info}
              isIdForCardUpdate={isIdForCardUpdate}
            />
          </div>
        ) : null}

      </div>
    </section>
  );
};

export default AllinOne;
