import style from '../components/moneyGuard.module.scss';
import {useEffect, useState } from 'react';
import { mainIncome, mainExpenses } from 'helpers/categories';
import { FaAngleDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';
import { Link,useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




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
  const [isAmount, setIsAmount] = useState("");
  const [isDetails, setIsDetails] = useState("");
  const navigate = useNavigate();

      const defaultCard = {
      id: info.length + 1,
      date: isDate,
      type: isExpense,
      category: isOption,
      details: isDetails,
      amount: isAmount}

  const { id } = useParams();
  
  const selectedCard = info.find(card => Number(card.id) === Number(id));
  useEffect(()=>{ if (selectedCard) {
    
    setIsExpense(selectedCard.type); 
    setIsOption(selectedCard.category);
    setIsDate(selectedCard.date);
    setIsAmount(selectedCard.amount);
    setIsDetails(selectedCard.details);
  }},[selectedCard])
 

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


    if (isOption === 'Select a category') {
  alert("Please select a type of income or expense.");
  return;
}

    if ( isAmount === '') {
  alert("Please add a value higher than 0.00");
  return;
    }

   
    if(id){ info.splice(id - 1, 1);defaultCard.id = Number(id)};
info.push(defaultCard)
    localStorage.setItem("listCards", JSON.stringify(info))
    setIsExpense(false);
    setIsListCategoriesOn(false);
    setIsOption('Select a category');
    setIsDate(today);
    setIsAmount("");
    setIsDetails("");

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
              pattern="^\d+(\.\d{1,2})?$"
              value={isAmount}
              title="Enter an amount highet than 0, that has the followig format 5, 5.5 or 5.00"
              placeholder="0.00"
              required
              autoComplete="off"
              onChange={e=>setIsAmount(e.target.value)}
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
              value={isDetails}
              placeholder="-"
              autoComplete="off"
               onChange={e=>setIsDetails(e.target.value)}
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
