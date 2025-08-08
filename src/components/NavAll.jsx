import { IoHomeSharp } from 'react-icons/io5';
import { ImStatsDots } from 'react-icons/im';
import style from "./moneyGuard.module.scss"

const NavAll = ({ isHomeSelected, handleNav }) => {
  return (
    <nav>
      <div
        onClick={isHomeSelected ? null : handleNav}
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
        onClick={isHomeSelected ? handleNav : null}
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
  );
};

export default NavAll
