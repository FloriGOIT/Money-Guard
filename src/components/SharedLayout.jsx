import Logo from './Logo';
import style from './moneyGuard.module.scss';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { IoHomeSharp } from 'react-icons/io5';
import { ImStatsDots } from "react-icons/im";
import { BsCurrencyExchange } from 'react-icons/bs';
import { Link, Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <section>
      <header className={style.sharedLayoutHeader}>
        <Logo />
        <div className={style.sharedLayoutUser}>
          <p>Florentina</p>
          <button title="Log Out">
            <RiLogoutCircleRLine />
          </button>
        </div>
      </header>

      <nav className={style.navLinks}>
        <Link to="/" className={style.selectedNav}>
          <IoHomeSharp />
        </Link>
        <Link to="/statistics">
          <ImStatsDots />
        </Link>
        <Link to="/currency">
          <BsCurrencyExchange />
        </Link>
      </nav>
      <Outlet />
    </section>
  );
};
export default SharedLayout;
