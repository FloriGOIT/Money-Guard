import style from '../components/moneyGuard.module.scss';
import {useState } from 'react';
import { mainIncome, mainExpenses } from 'helpers/categories';
import { FaAngleDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';


const todayNewDate = new Date();
const year = todayNewDate.getFullYear();
const month = (todayNewDate.getMonth() + 1).toString().padStart(2, '0');
const day = todayNewDate.getDate().toString().padStart(2, '0');
const today = `${year}-${month}-${day}`;

const NewCard = ({info}) => {
  const [isExpense, setIsExpense] = useState(false);
  const [isListCategoriesOn, setIsListCategoriesOn] = useState(false);
  const [isOption, setIsOption] = useState('Select a category');
  const [isDate, setIsDate] = useState(today);

  const navigate = useNavigate()
 

  let arrCategory = isExpense ? mainExpenses: mainIncome ;
  const buttonArrow = isListCategoriesOn ? <FaChevronUp /> : <FaAngleDown />;

  const handleToggle = () => {
    setIsExpense(prev => !prev);
    setIsOption('Select a category');
  };
  const handleSelectedCategory = e => {
    e.preventDefault();
    setIsListCategoriesOn(prev => !prev);
  };
  const handleOption = input => {
    setIsOption(input);
    setIsListCategoriesOn(prev => !prev);
  };


  const submitNewCard = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const typeInput = isExpense ? 'Expense' : 'Income'
    const sumInput= form.elements.amount.value;
    const dateInput = isDate;
    const detailsInput = form.elements.comment.value;

    if (isOption === 'Select a category') {
  alert("Please select a type of income or expense.");
  return;
}

    if ( sumInput < 0.01) {
  alert("Please add a value higher than 0.00");
  return;
}
    const objectNewCard = {
      id: nanoid(),
    date: dateInput,
    type: typeInput,
    category: isOption,
    details: detailsInput,
    sum: sumInput,
    };

    info.push(objectNewCard)
    localStorage.setItem("listCards",JSON.stringify(info))
    navigate("/")
  };

  return (
    <section className={style.newCardWrapper}>
      <div className={style.newCardContainer}>
        <h2>Add transaction</h2>
        
        <form className={style.newCardForm} onSubmit={submitNewCard}>
          <div className={style.newCardToggle}>
            <span style={{ color: isExpense ? 'white' : 'rgb(194, 240, 126)' }}>
              Income
            </span>
            <label className={style.switch}>
              <input
                type="checkbox"
                name="toggleNewCard"
                      checked={isExpense}
                onChange={handleToggle}
                autoComplete="off"
              />
              <span className={`${style.slider} ${style.round}`}></span>
            </label>
            <span style={{ color: isExpense ? 'rgb(211, 76, 76)' : 'white' }}>
              Expense
            </span>
          </div>

          <div className={`${style.rowFormNewCard} ${style.categorySelection}`}>
            <input
              type="text"
              value={isOption}
              readOnly
              name="selectAcategory"
              style={{ color: isOption === 'Select a category' ? "rgba(206, 204, 204, 0.664)" : "white" }}
              autoComplete="off"
            />
            <button
              onClick={handleSelectedCategory}
              className={style.rowFormNewCardElem2}
            >
              {buttonArrow}
            </button>
          </div>

          {isListCategoriesOn ? (
            <ul className={style.newCardList}>
              {arrCategory.map(category => (
                <li
                  key={category}
                  value={category.toLowerCase()}
                  className={`${style.newCardOption} ${
                    isExpense ? style.income : style.expense
                  }`}
                  onClick={() => handleOption(category)}
                >
                  <input
                    type="text"
                    name="category"
                    value={category}
                    readOnly
                    autoComplete="off"
                    required
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
              title="Enter an amount highet than 0, that has the followig format 5, 5.5 or 5.00"
              required
              autoComplete="off"
            />
            <input
              type="date"
              name="dateNewCard"
              className={style.date}
              value={isDate}
              onChange={e => setIsDate(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className={`${style.rowFormNewCard} ${style.commentSelection}`}>
            <input
              type="text"
              name="comment"
              className={style.comment}
              placeholder="-"
              autoComplete="off"
            />
          </div>

          <div className={style.newCardButtons}>

              <button
                type="submit"
                className={`${style.bigButton} ${style.selectedBtn}`}
              >Add
              </button>


            <Link
              to="/"
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
