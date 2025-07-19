import style from '../components/moneyGuard.module.scss';
import { useState } from 'react';
import { mainIncome, mainExpenses } from 'helpers/categories';
import { FaAngleDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';

const NewCard = () => {
  const [isIncome, setIsIncome] = useState(false);
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isOption, setIsOption] = useState('Select a category');
const today = new Date().toISOString().slice(0, 10);
  const object = {
    category: 'Select a category',
    amount: '0.00',
    date: today,
    comment: '-',
  };
  let arrCategory = isIncome ? mainExpenses : mainIncome;
  const buttonArrow = isSelectOpened ? <FaChevronUp /> : <FaAngleDown />;
  const handleToggle = () => {
    setIsIncome(prev => !prev);
    setIsOption('Select a category');
  };
  const handleSelectedForm = e => {
    e.preventDefault();
    setIsSelectOpened(prev => !prev);
  };
  const handleOption = input => {
    setIsOption(input);
    setIsSelectOpened(prev => !prev);
  };
  return (
    <section className={style.newCardWrapper}>
      <h2>Add transaction</h2>

      <div className={style.newCardToggle}>
        <span style={{ color: isIncome ? 'white' : 'rgb(194, 240, 126)' }}>
          Income
        </span>
        <label className={style.switch}>
          <input type="checkbox" checked={isIncome} onChange={handleToggle} />
          <span className={`${style.slider} ${style.round}`}></span>
        </label>
        <span style={{ color: isIncome ? 'rgb(211, 76, 76)' : 'white' }}>
          Expense
        </span>
      </div>

      <form className={style.newCardForm}>
        <span className={style.placeholderOption}>
          <input
            type="text"
            value={isOption}
            style={{
              color:
                isOption === 'Select a category'
                  ? 'rgba(206, 204, 204, 0.664)'
                  : 'white',
            }}
          />
          <button onClick={handleSelectedForm}>{buttonArrow}</button>
        </span>
        {isSelectOpened ? (
          <ul className={style.newCardList}>
            {arrCategory.map(category => (
              <li
                key={category}
                value={category.toLowerCase()}
                className={`${style.newCardOption} ${
                  isIncome ? style.income : style.expense
                }`}
                onClick={() => handleOption(category)}
              >
                <input type="text" value={category} readOnly />
              </li>
            ))}
          </ul>
        ) : null}
        <span className={`${style.placeholderOption} ${style.amountAndDate}`}>
          <input
            type="text"
            name="amount"
            placeholder={object.amount}
            pattern="^\d+(\.\d{1,2})?$"
            title="Enter an amount like 5, 5.5 or 5.00"
            required
            autoComplete="off"
          />
          <input type="date" className={style.date} value={object.date}/>
        </span>
        <span className={style.placeholderOption}>
          <input type="text" className={style.comment} placeholder={object.comment}/>
        </span>
      </form>
    </section>
  );
};

export default NewCard;
