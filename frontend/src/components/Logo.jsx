import logo from '../helpers/images/logo.png';
import style from './moneyGuard.module.scss';

const Logo = () => {
  return (
    <div className={style.logoWrapper}>
      <img src={logo} alt="money-guard-logo" />
      <span>Money Guard</span>
    </div>
  );
};
export default Logo;
