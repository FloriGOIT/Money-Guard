import style from "../moneyGuard.module.scss"


const BigBtnNoColorAll = ({valueBtn, handleAddCoinModal}) => {
        return <button className={style.bigBtnNoColor} onClick={handleAddCoinModal}>{valueBtn}</button>
}

export default BigBtnNoColorAll