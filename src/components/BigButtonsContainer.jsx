import style from './moneyGuard.module.scss';
import { Link } from 'react-router-dom';

const BigButtonsContainer = ({firstBtn, secondBtn}) => {
  return (
    <>
      <button
        type="submit"
        className={`${style.bigButton} ${style.selectedBtn}`}
      >
      {firstBtn}  
      </button>

      <Link to="/" className={`${style.bigButton} ${style.notSelectedBtn}`}>
        {secondBtn} 
      </Link>
    </>
  );
};

export default BigButtonsContainer;
