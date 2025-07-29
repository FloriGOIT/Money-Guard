import Nav from 'components/Nav';
import style from '../components/moneyGuard.module.scss';
import { months } from '../helpers/timeInfo';
import { currentYear } from '../helpers/timeInfo';
import ModalTime from '../components/ModalTime';
import { useEffect, useState } from 'react';
import DonutChart from 'components/DonutChart';

const ExpensesStatistics = ({ info }) => {
  const [isSelectedMonth, setIsSelectedMonth] = useState('-');
  const [isSelectedYear, setIsSelectedYear] = useState(currentYear);
  const [arrayMonthInSelectedYear, setArrayMonthInSelectedYear] = useState([]);
  const [selectedMonthAndYear, setSelectedMonthAndYear] = useState([]);

  const handleMonth = value => setIsSelectedMonth(value);
  const handleYear = value => setIsSelectedYear(value);

  useEffect(() => {
    const selectedYear = info.filter(
      info => Number(info.year) === Number(isSelectedYear)
    );
    const availableMonths = selectedYear.map(info => info.month);
    const uniqueMonths = [...new Set(availableMonths)];
    const filteredMonths = months.filter(month =>
      uniqueMonths.includes(month.name)
    );
    filteredMonths.push({ number: '-', name: '-' });
    console.log('filteredMonths', filteredMonths);
    setArrayMonthInSelectedYear(filteredMonths);
  }, [isSelectedYear, info]);

  useEffect(() => {
    const arr = info.filter(
      info => Number(info.year) === Number(isSelectedYear)
    );
    const filteredArr =
      isSelectedMonth !== '-'
        ? arr.filter(info => info.month === isSelectedMonth)
        : arr;

    setSelectedMonthAndYear(filteredArr);
  }, [info, isSelectedMonth, isSelectedYear]);

  const expensesArr =
    selectedMonthAndYear.filter(transaction => transaction.type) || [];
  const expensesArrReducer = expensesArr.reduce((acc, item) => {
    const { category, amount, color } = item;
    const numericAmount = parseFloat(amount);
    if (!acc[category]) {
      acc[category] = {
        total: 0,
        color: color,
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

  const infoReducer = selectedMonthAndYear.reduce(
    (acc, item) => {
      const category =
        item.type === true
          ? 'expenses'
          : item.type === false
          ? 'incomes'
          : null;
      if (!category) return acc;

      const amount = parseFloat(item.amount);
      acc[category] += amount;

      return acc;
    },
    {
      incomes: 0,
      expenses: 0,
    }
  );

  const filterYearsForSelection = info
    .map(info => info.date.split('-')[0])
    .filter((year, index, array) => array.indexOf(year) === index)
    .sort((a, b) => a.localeCompare(b))
    .map(year => {
      return { number: year, name: year };
    });

  console.log('cumulatedExpenes', cumulatedExpenes);
  return (
    <section className={style.statisticsWrapper}>
      <Nav />
      <div className={style.chartWrapper}>
        <DonutChart info={cumulatedExpenes} />
      </div>

      <div className={style.statistics}>
        <ModalTime
          initialValue={isSelectedYear}
          info={filterYearsForSelection}
          handleYear={handleYear}
          handleMonth={handleMonth}
          name="years"
        />

        <ModalTime
          initialValue={isSelectedMonth}
          info={arrayMonthInSelectedYear}
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
