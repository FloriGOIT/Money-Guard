
import Logo from './Logo';
import style from './moneyGuard.module.scss';


const Header = ({handleLogOutModal}) => {
  return (
      <header className={style.sharedLayoutHeader}>
        <Logo />
      </header>
  );
};
export default Header;

/*
//import { RiLogoutCircleRLine } from 'react-icons/ri';
//import { Link } from 'react-router-dom';
const Header = ({handleLogOutModal}) => {
  return (
      <header className={style.sharedLayoutHeader}>
        <Logo />
        <div className={style.sharedLayoutUser}>
          <p>Florentina</p>
          <Link to="/logout" title="Log Out">
            <RiLogoutCircleRLine />
          </Link>
        </div>
      </header>

  );
};
export default Header;
*/