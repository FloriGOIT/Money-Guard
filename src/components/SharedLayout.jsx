

import Logo from "./Logo";
import style from "./moneyGuard.module.scss";
import { RiLogoutCircleRLine } from "react-icons/ri";

const SharedLayout = () => {
        return (<header className={style.sharedLayout}>
                <Logo />
                <div className={style.sharedLayoutUser}>
                        <p>Florentina</p>
                       <button type="button" title="Log Out"><RiLogoutCircleRLine/></button> 

                </div>


        </header>)
}
export default SharedLayout