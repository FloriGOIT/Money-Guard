import Nav from 'components/Nav';
import style from '../components/moneyGuard.module.scss';
import { months, years } from '../helpers/timeInfo';
import { currentMonth, currentYear } from '../helpers/timeInfo';
import ModalTime from '../components/ModalTime';

const ExpensesStatistics = () => {
  const monthObj = months.find(month => month.number === currentMonth);
  const initialValueMonth = monthObj.name;
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

        <div className={style.tableBodyCategories}>
          <div className={style.categoryWithColor}>
            <span>COLOR</span>
            <span>EXPENSE</span>
          </div>
          <span>AMOUNT</span>
        </div>


      </div>
    </section>
  );
};

export default ExpensesStatistics;

/*


        <div className={style.statisticsHeader}>
          <span>Expene</span>
          <span>Amount</span>
        </div>
        <div className={style.statisticsData}>
          <div>
            <span>color</span>
            <span>category name</span>
          </div>
          <span>amount</span>
        </div>
        <div className={style.statisticsTotal}>
          <div className={style.statisticsExpense}>
            <span>Expense:</span>
            <span>..amount</span>
          </div>
          <div className={style.statisticsIncome}>
            <span>Income:</span>
            <span>..amount</span>
          </div>
        </div>

        */
