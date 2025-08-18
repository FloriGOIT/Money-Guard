import style from '../moneyGuard.module.scss';
import { useState } from 'react';
import { mainIncomes, mainExpenses,allCategories } from '../../helpers/categories';
const NewCardFormAll = () => {
         const [isExpense, setIsExpense] = useState(false);
         const [isListCategoriesOn, setIsListCategoriesOn] = useState(false);
         //const [isOption, setIsOption] = useState('Select a category');
         //const [isDate, setIsDate] = useState(today);
         //const [isAmount, setIsAmount] = useState("");
         //const [isDetails, setIsDetails] = useState("");
         //const [isColor, setIsColor] = useState("")
let arrCategory = isExpense ? mainExpenses: mainIncomes ;        
  return (
    <div className={style.newCardFormAllContainer}>
      <h2>Add transaction</h2>

        <form className={style.newCardFormAll} >
          <div className={style.newCardToggle}>
            <span style={{ color: isExpense ? 'white' : 'rgb(194, 240, 126)' }}>
              Income
            </span>
            <label className={style.switch}>
              <input
                type="checkbox"
                name="toggleNewCard"
                checked={isExpense}
                //onChange={handleToggle}
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
              //value={isOption}
              readOnly
              name="selectAcategory"
              //style={{ color: isOption === 'Select a category' ? "rgba(206, 204, 204, 0.664)" : "white" }}
              autoComplete="off"
            />
            <button
              //onClick={handleSelectedCategory}
              className={style.rowFormNewCardElem2}
            >
              ➡️
            </button>
          </div>

          {isListCategoriesOn ? (
            <ul className={style.newCardList}>
              {arrCategory.map(category => (
                <li
                  key={category.type}
                  value={category.type.toLowerCase()}
                  className={style.newCardOption }
                  //onClick={() => handleOption(category.type)}
                >
                  <input
                    type="text"
                    name={category.type}
                    value={category.type}
                    readOnly
                    autoComplete="off"
                    required
                    className={!isExpense ? `${style.income}` : `${style.expense}`}
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
              //value={isAmount}
              title="Enter an amount highet than 0, that has the followig format 5, 5.5 or 5.00"
              placeholder="0.00"
              required
              autoComplete="off"
              //onChange={e=>setIsAmount(e.target.value)}
            />
            <input
              type="date"
              name="dateNewCard"
              className={style.date}
              //onChange={e => setIsDate(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className={`${style.rowFormNewCard} ${style.commentSelection}`}>
            <input
              type="text"
              name="comment"
              className={style.comment}
              //value={isDetails}
              placeholder="-"
              autoComplete="off"
               //onChange={e=>setIsDetails(e.target.value)}
            />
          </div>


        </form>
    </div>
  );
};

export default NewCardFormAll;


/*


          
          */