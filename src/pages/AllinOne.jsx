import style from '../components/moneyGuard.module.scss';
import { IoHomeSharp } from 'react-icons/io5';
import { ImStatsDots } from 'react-icons/im';
import { useState } from 'react';
import Balance from 'components/Balance';
import CurrencyTable from "../components/CurrencyTable"

const AllinOne = ({ info }) => {
  const [isHomeSelected, setIsHomeSelected] = useState(true);
  const handleNav = () => setIsHomeSelected(pre => !pre);
  return (
    <section className={style.allinOneWrapper}>
      <div className={style.allinOneContainerPermanent}>
        <NavAll isHomeSelected={isHomeSelected} handleNav={handleNav} />
        <Balance info={info} />
        <CurrencyTable/>
      </div>
    </section>
  );
};

export default AllinOne;

const NavAll = ({ isHomeSelected, handleNav }) => {
  return (
    <nav>
      <div
        onClick={isHomeSelected ? null : handleNav}
        className={
          isHomeSelected
            ? `${style.selectedNavAll}`
            : `${style.notSelectedNavAll}`
        }
      >
        <IoHomeSharp />
        <span>Home</span>
      </div>

      <div
        onClick={isHomeSelected ? handleNav : null}
        className={
          isHomeSelected
            ? `${style.notSelectedNavAll}`
            : `${style.selectedNavAll}`
        }
      >
        <ImStatsDots />
        <span>Statistics</span>
      </div>
    </nav>
  );
};
