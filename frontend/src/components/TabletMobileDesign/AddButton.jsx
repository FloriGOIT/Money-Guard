import style from "../moneyGuard.module.scss"
import { IoAddSharp } from 'react-icons/io5';


const AddButton = () => {
        return (<button type="button" className={style.addButtonAll} >
                <IoAddSharp className={style.addButtonSVG}/>
        </button>)
}

export default AddButton
