import style from "../moneyGuard.module.scss"


const BigBtnNoColorAll = ({valueBtn, handleAddCardModal}) => {
        return <button className={style.bigBtnNoColor} onClick={handleAddCardModal}>{valueBtn}</button>
}

export default BigBtnNoColorAll