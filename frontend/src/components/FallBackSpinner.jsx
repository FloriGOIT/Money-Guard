import { FadeLoader } from "react-spinners";
import style from "./moneyGuard.module.scss"


const FallBackSpinner = () => {
        return (
                <div className={style.fallBackSpinner}>
                        <FadeLoader  color="white" size={120}  />
                </div>
        )
}
export default FallBackSpinner