import style from '../moneyGuard.module.scss';
import { useState } from 'react';
import Balance from 'components/Balance';
import CurrencyAll from './CurrencyAll';
import ListCardsAll from 'components/TabletMobileDesign/ListCardsAll';
import ModalTimeAll from 'components/TabletMobileDesign/ModalTimeAll';
import NavAll from 'components/TabletMobileDesign/NavAll';
import NewCoinFormAll from './NewCoinFormAll';
import { currentYear, currentMonthLetter } from '../../helpers/timeInfo';

const AllinOne = ({ info }) => {
  const [isHomeNavSelected, setIsHomeNavSelected] = useState(false);
  const [isNewCoinModalOn, setisNewCoinModalOn] = useState(false)

  const [isYearMonthForFilter, setisYearMonthForFilter] = useState({
    year: currentYear,
    month: currentMonthLetter,
  });

  const handleYearMonth = value => setisYearMonthForFilter(value);
  const handleNav = () => setIsHomeNavSelected(pre => !pre);
  const handleAddCoin = () => setisNewCoinModalOn(prev=> !prev)

  return (
    <section className={style.allinOneWrapper}>

        <div className={style.allinOneContainerPermanent}>
          <NavAll isHomeSelected={isHomeNavSelected} handleNav={handleNav} />
          <Balance info={info} />
        <CurrencyAll handleAddCoin={handleAddCoin} />
        </div>
        <div className={style.allinOneContainerRight}>
          <ModalTimeAll info={info} handleYearMonth={handleYearMonth} />
          <ListCardsAll
            info={info}
            isYearMonthForFilter={isYearMonthForFilter}
          />
      </div>
     {isNewCoinModalOn? <div className={style.newCoinAllFormContainer}>
        <NewCoinFormAll  /> 
      </div> : null}
    </section>
  );
};

export default AllinOne;

//      <NewCoinAll />       
