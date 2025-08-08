import style from '../../components/moneyGuard.module.scss';
import { useState } from 'react';
import Balance from 'components/Balance';
import CurrencyTable from "../CurrencyTable"
import ListCardsAll from 'components/TabletMobileDesign/ListCardsAll';
import ModalTimeAll from 'components/TabletMobileDesign/ModalTimeAll';
import NavAll from 'components/TabletMobileDesign/NavAll';
import { currentYear, currentMonthLetter } from '../../helpers/timeInfo';



const AllinOne = ({ info }) => {
  const [isHomeSelected, setIsHomeSelected] = useState(true);
  const [isYearMonthForFilter, setisYearMonthForFilter] = useState({ year: currentYear, month: currentMonthLetter });

  const handleYearMonth = value => setisYearMonthForFilter(value)
  const handleNav = () => setIsHomeSelected(pre => !pre);

  return (
    <section className={style.allinOneWrapper}>
      <div className={style.allinOneContainerPermanent}>
        <NavAll isHomeSelected={isHomeSelected} handleNav={handleNav} />
        <Balance info={info} />
        <CurrencyTable />
      </div>
      <div className={style.allinOneContainerRight}>
        <ModalTimeAll info={info} handleYearMonth={handleYearMonth} />
        <ListCardsAll info={info} isYearMonthForFilter={isYearMonthForFilter} />
      </div>
    </section>
  );
};

export default AllinOne;

