import style from '../moneyGuard.module.scss';
import { useEffect, useState } from 'react';
import {
  mainIncomes,
  mainExpenses,
  allCategories,
} from '../../helpers/categories';
import { FaAngleDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import { today, months } from '../../helpers/timeInfo';
import BigBtnWithColorAll from './BigBtnWithColorAll';
import BigBtnNoColorAll from './BigBtnNoColorAll';

const NewCardFormAll = ({ info, handleAddCardModal, isIdForCardUpdate, handleIdForCardUpdate }) => {
  const [isExpense, setIsExpense] = useState(false);
  const [isListCategoriesOn, setIsListCategoriesOn] = useState(false);
  const [isOption, setIsOption] = useState('Select a category');
  const [isDate, setIsDate] = useState(today);
  const [isAmount, setIsAmount] = useState('');
  const [isDetails, setIsDetails] = useState('');
  const [isColor, setIsColor] = useState('');

  const monthPreLether = months.filter(
    month => month.number === isDate.split('-')[1]
  );
  const monthLether = monthPreLether[0].name;
  const defaultCard = {
    id: nanoid(),
    date: isDate,
    year: isDate.split('-')[0],
    month: monthLether,
    type: isExpense,
    category: isOption,
    details: isDetails,
    amount: isAmount,
    color: isColor,
  };

 const selectedCard = info.find(card => card.id === isIdForCardUpdate)
 console.log("selectedCard",selectedCard)

  useEffect(()=>{ if (selectedCard) {
    
    setIsExpense(selectedCard.type); 
    setIsOption(selectedCard.category);
    setIsDate(selectedCard.date);
    setIsAmount(selectedCard.amount);
    setIsDetails(selectedCard.details);
    setIsColor(selectedCard.color)
  }},[selectedCard])



  let arrCategory = isExpense ? mainExpenses : mainIncomes;
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
    const identifyColor = allCategories.find(
      category => category.type === input
    );
    setIsColor(identifyColor.color);
    setIsListCategoriesOn(prev => !prev);
  };

  const submitNewCard = e => {
    e.preventDefault();
    const infoCopy = [...info];
    const index = infoCopy.findIndex(card => card.id === isIdForCardUpdate);
    if (isIdForCardUpdate) {
      infoCopy.splice(index, 1,defaultCard);
    }else{infoCopy.push(defaultCard);}

    if (isOption === 'Select a category') {
      alert('Please select a type of income or expense.');
      return;
    }

    if (isAmount === '') {
      alert('Please add a value higher than 0.00');
      return;
    }
    if (Number(defaultCard.year) < 2020) {
      alert('Please enter a date that starts with year 2020');
      return;
    }
       
    localStorage.setItem('listCards', JSON.stringify(infoCopy));
    setIsExpense(false);
    setIsListCategoriesOn(false);
    setIsOption('Select a category');
    setIsDate(today);
    setIsAmount('');
    setIsDetails('');
    setIsColor('');
    handleIdForCardUpdate("")
 handleAddCardModal();
  };

  return (
    <section className={style.newCardContainer}>
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
            style={{
              color:
                isOption === 'Select a category'
                  ? 'rgba(206, 204, 204, 0.664)'
                  : 'white',
            }}
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
                key={category.type}
                value={category.type.toLowerCase()}
                className={style.newCardOption}
                onClick={() => handleOption(category.type)}
              >
                <input
                  type="text"
                  name={category.type}
                  value={category.type}
                  readOnly
                  autoComplete="off"
                  required
                  className={
                    !isExpense ? `${style.income}` : `${style.expense}`
                  }
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
            onChange={e => setIsAmount(e.target.value)}
          />
          <input
            type="date"
            name="dateNewCard"
            className={style.date}
            onChange={e => setIsDate(e.target.value)}
            autoComplete="off"
            value={isDate}
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
            onChange={e => setIsDetails(e.target.value)}
          />
        </div>

        <div className={style.bigButtons}>
          <BigBtnWithColorAll type="submit" valueBtn="Add" />

          <BigBtnNoColorAll
            valueBtn="Cancel"
            handleModal={handleAddCardModal}
          />
        </div>
      </form>
    </section>
  );
};

/*


*/

export default NewCardFormAll;

/*


          
          */
