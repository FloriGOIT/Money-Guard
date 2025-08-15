import style from "../moneyGuard.module.scss"

const BigBtnWithColorAll = ({valueBtn}) => {
        return <button type="submit" className={style.bigBtnWithColor} >{valueBtn}</button>
}

export default BigBtnWithColorAll