import style from '../components/moneyGuard.module.scss';
import Nav from '../components/Nav';
import CurrencyTable from 'components/CurrencyTable';

const Currency = () => {
  const returnLocation = "/currency";
  return (
    <section className={style.currencyWrapper}>
      <Nav />
      <div className={style.currencyContainer}>
        <h2>Currency exchange</h2>
        <CurrencyTable returnLocation={returnLocation} />
      </div>
    </section>
  );
};

export default Currency;
