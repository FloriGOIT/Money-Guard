import style from '../components/moneyGuard.module.scss';
import { IoHomeSharp } from 'react-icons/io5';
import { ImStatsDots } from 'react-icons/im';
import { useState } from 'react';

const AllinOne = () => {
  const [isHomeSelected, setIsHomeSelected] = useState(true);

  return (
    <section className={style.allinOneWrapper}>
      <nav>
        <div
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
    </section>
  );
};

export default AllinOne;
