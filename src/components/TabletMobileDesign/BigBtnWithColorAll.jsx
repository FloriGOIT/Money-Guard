import style from "../moneyGuard.module.scss"

const BigBtnWithColorAll = ({valueBtn,type}) => {
        return <button type={type} className={style.bigBtnWithColor} >{valueBtn}</button>
}

export default BigBtnWithColorAll