import Logo from './Logo';
import style from './moneyGuard.module.scss';
import { RiLogoutCircleRLine } from 'react-icons/ri';

const Header = () => {
  return (
<section className={style.sharedLayoutWrapper}>
      <header className={style.sharedLayoutHeader}>
        <Logo />
        <div className={style.sharedLayoutUser}>
          <p>Florentina</p>
          <button to="/logout" title="Log Out">
            <RiLogoutCircleRLine />
          </button>
        </div>
      </header>
</section>
  );
};
export default Header;