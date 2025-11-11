import style from "../moneyGuard.module.scss"


const BigBtnNoColorAll = ({valueBtn, handleModal}) => {
        return <button className={style.bigBtnNoColor} onClick={handleModal}>{valueBtn}</button>
}

export default BigBtnNoColorAll