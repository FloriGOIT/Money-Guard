import style from '../components/moneyGuard.module.scss';
import { useEffect, useState } from 'react';
import { mainIncome, mainExpenses } from 'helpers/categories';
import { FaAngleDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import dataCard from 'helpers/dataCard';

const todayNewDate = new Date();
const year = todayNewDate.getFullYear();
const month = (todayNewDate.getMonth() + 1).toString().padStart(2, '0');
const day = todayNewDate.getDate().toString().padStart(2, '0');
const today = `${year}-${month}-${day}`;

const NewCard = () => {
  const [isIncome, setIsIncome] = useState(false);
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isOption, setIsOption] = useState('Select a category');
  const [isAmount, setIsAmount] = useState(0);
  const [isDate, setIsDate] = useState(today);
  const [isComment, setIstComment] = useState('-');

  useEffect(()=>{setIsSelectOpened(prev => !prev);},[isOption])
  const objectDefaultCard = {
    date: isDate,
    type: isIncome ? 'Expense' : 'Income',
    category: isOption,
    details: isComment,
    sum: isAmount,
  };
  console.log('objectDefaultCard', objectDefaultCard);
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
  };

  const submitNewCard = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const info = form.elements.selectAcategory.value;
    console.log('info', info);
  };

  return (
    <section className={style.newCardWrapper}>
      <div className={style.newCardContainer}>
        <h2>Add transaction</h2>

        <form className={style.newCardForm} onSubmit={submitNewCard}>
          <div className={style.newCardToggle}>
            <span style={{ color: isIncome ? 'white' : 'rgb(194, 240, 126)' }}>
              Income
            </span>
            <label className={style.switch}>
              <input
                type="checkbox"
                name="toggleNewCard"
                checked={isIncome}
                onChange={handleToggle}
              />
              <span className={`${style.slider} ${style.round}`}></span>
            </label>
            <span style={{ color: isIncome ? 'rgb(211, 76, 76)' : 'white' }}>
              Expense
            </span>
          </div>

          <div className={`${style.rowFormNewCard} ${style.categorySelection}`}>
            <input
              type="text"
              placeholder={isOption}
              name="selectAcategory"
              style={{
                color:
                  isOption === 'Select a category'
                    ? 'rgba(206, 204, 204, 0.664)'
                    : 'white',
              }}
            />
            <button
              onClick={handleSelectedForm}
              className={style.rowFormNewCardElem2}
            >
              {buttonArrow}
            </button>
          </div>

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
                  <input
                    type="text"
                    name="category"
                    value={category}
                    readOnly
                  />
                </li>
              ))}
            </ul>
          ) : null}

          <div
            className={`${style.rowFormNewCard} ${style.amountAndDateSelection}`}
          >
            <input
              className={style.amount}
              type="text"
              name="amount"
              placeholder="0.00"
              pattern="^\d+(\.\d{1,2})?$"
              title="Enter an amount like 5, 5.5 or 5.00"
              required
              autoComplete="off"
            />
            <input
              type="date"
              name="dateNewCard"
              className={style.date}
              value={objectDefaultCard.date}
            />
          </div>

          <div className={`${style.rowFormNewCard} ${style.commentSelection}`}>
            <input
              type="text"
              name="comment"
              className={style.comment}
              placeholder={objectDefaultCard.comment}
            />
          </div>

          <div className={style.newCardButtons}>
            <Link>
              <button
                type="submit"
                className={`${style.bigButton} ${style.selectedBtn}`}
              >
                Add
              </button>
            </Link>

            <Link
              to="/login"
              className={`${style.bigButton} ${style.notSelectedBtn}`}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewCard;

/*


*/
