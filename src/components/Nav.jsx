import style from './moneyGuard.module.scss';
import { IoHomeSharp } from 'react-icons/io5';
import { ImStatsDots } from "react-icons/im";
import { BsCurrencyExchange } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/")
  const navLocation = pathName[1];
  const linkNavLocation = `/${navLocation}`

  return (
    <nav className={style.navLinks}>
      
      <Link to="/" className={linkNavLocation === "/"? `${style.selectedNav}`:null}>
        <IoHomeSharp />
      </Link>
      <Link to="/statistics" className={linkNavLocation === "/statistics"? `${style.selectedNav}`:null}>
        <ImStatsDots />
      </Link>
      <Link to="/currency" className={linkNavLocation === "/currency"? `${style.selectedNav}`:null}>
        <BsCurrencyExchange />
      </Link>
    </nav>
  );
};
export default Nav
