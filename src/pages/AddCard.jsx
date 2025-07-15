import style from '../components/moneyGuard.module.scss';
import { useState } from 'react';
import { mainIncome, mainExpenses } from 'helpers/categories';

const AddCard = () => {
  const [isIncome, setIsIncome] = useState(false);
  let arrCategory = isIncome?mainIncome:mainExpenses

  const handleToggle = () => {
    setIsIncome(prev => !prev);
  };
  return (
    <section className={style.addCardWrapper}>
      <h2>Add transaction</h2>

      <div className={style.addCardToggle}>
        <span style={{color: isIncome?"white":"rgb(194, 240, 126)"}}>Income</span>
        <label className={style.switch}>
          <input type="checkbox" checked={isIncome} onChange={handleToggle} />
          <span className={`${style.slider} ${style.round}`} ></span>
        </label>
        <span style={{color: isIncome?"rgb(211, 76, 76)":"white"}}>Expense</span>
      </div>

      <form className={style.addCardForm}>
        <select className={style.addCardFormSelect}>
          <option className={style.addCardOption} disabled selected hidden>Select an option...</option>
          {arrCategory.map(category => <option key={category} value={category.toLowerCase()} className={style.addCardOption}>{category}</option>)}
        </select>
      </form>
    </section>
  );
};

export default AddCard;
