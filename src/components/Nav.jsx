import style from './moneyGuard.module.scss';
import { IoHomeSharp } from 'react-icons/io5';
import { ImStatsDots } from "react-icons/im";
import { BsCurrencyExchange } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const Nav = () => {
  return (
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
  );
};
export default Nav
