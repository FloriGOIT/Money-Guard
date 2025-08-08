import style from '../components/moneyGuard.module.scss';
import { useState } from 'react';
import Balance from 'components/Balance';
import CurrencyTable from "../components/CurrencyTable"
import ListCardsTablet from 'components/ListCardsTablet';
import ModalTimeSelect from 'components/ModalTimeSelect';
import NavAll from 'components/NavAll';
import { currentYear, currentMonthLetter } from '../helpers/timeInfo';
import handleFormatNumber from '../helpers/numberFormat';


const AllinOne = ({ info }) => {
  const [isHomeSelected, setIsHomeSelected] = useState(true);
  const [isYearMonthForFilter, setisYearMonthForFilter] = useState({ year: currentYear, month: currentMonthLetter });

  const handleYearMonth = value => setisYearMonthForFilter(value)
  const handleNav = () => setIsHomeSelected(pre => !pre);

  return (
    <section className={style.allinOneWrapper}>
      <div className={style.allinOneContainerPermanent}>
        <NavAll isHomeSelected={isHomeSelected} handleNav={handleNav} />
        <Balance info={info} handleFormatNumber={handleFormatNumber} />
        <CurrencyTable />
      </div>
      <div className={style.allinOneContainerRight}>
        <ModalTimeSelect info={info} handleYearMonth={handleYearMonth} />
        <ListCardsTablet info={info} isYearMonthForFilter={isYearMonthForFilter} handleFormatNumber={handleFormatNumber}/>
      </div>
    </section>
  );
};

export default AllinOne;

