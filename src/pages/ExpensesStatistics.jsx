import Nav from 'components/Nav';
import style from '../components/moneyGuard.module.scss';
import { months, years } from '../helpers/timeInfo';
import { currentMonth, currentYear } from '../helpers/timeInfo';
import ModalTime from '../components/ModalTime';

const ExpensesStatistics = ({ info }) => {
  const monthObj = months.find(month => month.number === currentMonth);
  const initialValueMonth = monthObj.name;
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

  const cumulatedExpenes = Object.entries(expensesArrReducer).map(
    ([category, data]) => ({
      category,
      total: data.total,
      color: data.color,
    })
  ).sort((a, b) => b.total - a.total);
  

  const infoReducer = info.reduce((acc, item) => {
    const category = item.type === true ? 'expenses' : 'incomes';
    const amount = parseFloat(item.amount);
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  console.log('infoReducer', infoReducer);

  // Convert to array of objects

  return (
    <section className={style.statisticsWrapper}>
      <Nav />
      <div className={style.statistics}>
        <ModalTime
          initialValue={initialValueMonth}
          info={months}
          name="months"
        />

        <ModalTime initialValue={currentYear} info={years} name="years" />

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
