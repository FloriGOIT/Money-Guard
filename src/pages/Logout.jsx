import style from '../components/moneyGuard.module.scss';

const Logout = () => {
  return (
    <div className={style.logoutWrapper}>
      <p>Are you sure you want to log out?</p>
      <button type="button" className={`${style.bigButton} ${style.selectedBtn}`}>
        LOG OUT
      </button>
      <button type="button" className={`${style.bigButton} ${style.notSelectedBtn}`}>
        CANCEL
      </button>
    </div>
  );
};

export default Logout;
