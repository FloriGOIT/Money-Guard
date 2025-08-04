import style from '../components/moneyGuard.module.scss';
import Nav from '../components/Nav';
import CurrencyTable from 'components/CurrencyTable';
import { IoAddSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
const Currency = () => {
  const returnLocation = '/currency';
  return (
    <section className={style.currencyWrapper}>
        <Nav />
        <div className={style.currencyContainer}>
          <div className={style.currencyContainerHeader}>
            <h2>Currency exchange</h2>
            <Link to="/currency/newCoin" className={style.addCoinButton}>
              <IoAddSharp />
            </Link>
          </div>

          <CurrencyTable returnLocation={returnLocation} />
        </div>

    </section>
  );
};

export default Currency;
