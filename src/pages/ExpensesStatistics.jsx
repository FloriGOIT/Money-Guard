import Nav from "components/Nav"
import style from "../components/moneyGuard.module.scss"

const ExpensesStatistics = () => {
        
        return (<section className={style.statisticsWrapper}>
                <Nav/>
                <div className={style.statistics}>
                        <div className={style.statisticsPeriod}>
                                <span>Month</span>
                                <span>Year</span>
                        </div>
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
                
                </div>
                
        </section>)
}

export default ExpensesStatistics