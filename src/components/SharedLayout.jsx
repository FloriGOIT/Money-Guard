import Logo from './Logo';
import style from './moneyGuard.module.scss';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Link, Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <section className={style.sharedLayout}>
      <header className={style.sharedLayoutHeader}>
        <Logo />
        <div className={style.sharedLayoutUser}>
          <p>Florentina</p>
          <Link to="/logout" title="Log Out">
            <RiLogoutCircleRLine />
          </Link>
        </div>
      </header>


      <Outlet />
    </section>
  );
};
export default SharedLayout;
