import style from '../moneyGuard.module.scss';
import { months, currentYear } from '../../helpers/timeInfo';
import ModalTime from '../ModalTime';
import { useEffect, useState } from 'react';
import DonutChart from '../DonutChart';

const StatisticsAll = ({ info }) => {
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
    selectedMonthAndYear.filter(transaction => transaction.expense) || [];
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
        item.expense === true
          ? 'expenses'
          : item.expense === false
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

  return (
    <div className={style.statistics}>
      <div className={style.leftSideStatistics}>
        <h2>Expenses statistics</h2>
        <ModalTime
          initialValue={isSelectedYear}
          infoPeriod={filterYearsForSelection}
          handleYear={handleYear}
          handleMonth={handleMonth}
          name="years"
        />

        <ModalTime
          initialValue={isSelectedMonth}
          infoPeriod={arrayMonthInSelectedYear}
          handleMonth={handleMonth}
          name="months"
        />

        {infoReducer.expenses > 0 ? (
          <div className={style.chartWrapper}>
            <DonutChart info={cumulatedExpenes} />
          </div>
        ) : null}
      </div>

      <div className={style.rightSideStatistics}>
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
                {new Intl.NumberFormat('fr-FR').format(
                  expense.total.toFixed(2)
                )}
              </span>
            </div>
          );
        })}

        <div className={style.totalCategories}>
          <div className={style.totalIncomes}>
            <span>Incomes:</span>
            <span>
              {new Intl.NumberFormat('fr-FR').format(
                infoReducer.incomes.toFixed(2)
              )}
            </span>
          </div>

          <div className={style.totalExpenses}>
            <span>Expenses:</span>
            <span>
              {new Intl.NumberFormat('fr-FR').format(
                infoReducer.expenses.toFixed(2)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsAll;

/*



        */
