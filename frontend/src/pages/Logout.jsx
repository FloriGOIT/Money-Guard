import style from '../components/moneyGuard.module.scss';
import { Link } from 'react-router-dom';

const Logout = () => {
  return (
    <section className={style.logoutWrapper}>
      <div className={style.logoutContainer}>
        <p>Are you sure you want to log out?</p>
        <Link to="/login" className={`${style.bigButton} ${style.selectedBtn}`}>
          LOG OUT
        </Link>
        <Link to="/" className={`${style.bigButton} ${style.notSelectedBtn}`}>
          CANCEL
        </Link>
      </div>
    </section>
  );
};

export default Logout;
