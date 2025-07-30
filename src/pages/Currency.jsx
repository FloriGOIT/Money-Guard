import style from "../components/moneyGuard.module.scss";
import Nav from "../components/Nav";
import CurrencyTable from "components/CurrencyTable";

const Currency = () => {
        return (<section className={style.currencyWrapper}>
                <Nav/>

                 <CurrencyTable/>

        </section>)
}

export default Currency