import style from "../components/moneyGuard.module.scss";
import Nav from "../components/Nav"

const Currency = () => {
        return (<section className={style.currencyWrapper}>
                <Nav/>
                <div  className={style.currency}>
                 <span style={{color:"white"}}>CURENNCY</span>
                </div>
        </section>)
}

export default Currency