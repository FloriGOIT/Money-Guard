import style from './moneyGuard.module.scss';
import { Link } from 'react-router-dom';



const BigButtonsContainer = ({ firstBtn, secondBtn, handleSubmit }) => {
  const returnLocation = "/currency";
  return (
    <>
      <button
        className={`${style.bigButton} ${style.selectedBtn}`}
      >
      {firstBtn}  
      </button>

      <Link to={returnLocation} className={`${style.bigButton} ${style.notSelectedBtn}`}>
        {secondBtn} 
      </Link>
    </>
  );
};

export default BigButtonsContainer;
