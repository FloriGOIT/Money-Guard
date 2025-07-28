import Nav from 'components/Nav';
import style from '../components/moneyGuard.module.scss';
import { months } from '../helpers/timeInfo';
import { currentMonth, currentYear } from '../helpers/timeInfo';
import ModalTime from '../components/ModalTime';
import { useState } from 'react';

const ExpensesStatistics = ({ info }) => {
  const monthObj = months.find(month => month.number === currentMonth);
  const initialValueMonth = monthObj.name;
  const [isSelectedMonth, setIsSelectedMonth] = useState(initialValueMonth);
  const [isSelectedYear, setIsSelectedYear] = useState(currentYear);

  const handleMonth = value => setIsSelectedMonth(value);
  const handleYear = value => setIsSelectedYear(value);
  console.log('PERIOD', isSelectedMonth, isSelectedYear);
  
  const selectedInfo = info.filter(info => info.month === isSelectedMonth);
  console.log("selectedInfo", selectedInfo)
  
  const expensesArr = info.filter(transaction => transaction.type);
  const expensesArrReducer = expensesArr.reduce((acc, item) => {
    const { category, amount, color } = item;
    const numericAmount = parseFloat(amount);
    if (!acc[category]) {
      acc[category] = {
        total: 0,
        color: color, // Save the color from the first item of this category
      };
    }
    acc[category].total += numericAmount;
    return acc;
  }, {});

  const cumulatedExpenes = Object.entries(expensesArrReducer)
    .map(([category, data]) => ({
      category,
      total: data.total,
      color: data.color,
    }))
    .sort((a, b) => b.total - a.total);

  const infoReducer = info.reduce((acc, item) => {
    const category = item.type === true ? 'expenses' : 'incomes';
    const amount = parseFloat(item.amount);
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  const filterYears = info
    .map(info => info.date.split('-')[0])
    .filter((year, index, array) => array.indexOf(year) === index)
    .sort((a, b) => a.localeCompare(b))
    .map(year => {
      return { number: year, name: year };
    });

  // Convert to array of objects

  return (
    <section className={style.statisticsWrapper}>
      <Nav />
      <div className={style.statistics}>
        <ModalTime
          initialValue={isSelectedYear}
          info={filterYears}
          handleYear={handleYear}
          name="years"
        />

        <ModalTime
          initialValue={isSelectedMonth}
          info={months}
          handleMonth={handleMonth}
          name="months"
        />

        <div className={style.tableHeaderCategories}>
          <span>Category</span>
          <span>Sum</span>
        </div>
        {cumulatedExpenes.map(expense => {
          return (
            <div key={expense.category} className={style.tableRowsCategories}>
              <div className={style.categoryWithColor}>
                <span style={{ backgroundColor: `${expense.color}` }}></span>
                <span>{expense.category}</span>
              </div>
              <span className={style.categoryAmount}>
                {Number(expense.total).toFixed(2)}
              </span>
            </div>
          );
        })}

        <div className={style.totalCategories}>
          <div className={style.totalIncomes}>
            <span>Incomes:</span>
            <span>{Number(infoReducer.incomes).toFixed(2)}</span>
          </div>

          <div className={style.totalExpenses}>
            <span>Expenses:</span>
            <span>{Number(infoReducer.expenses).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpensesStatistics;

/*



        */
