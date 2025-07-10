import style from './moneyGuard.module.scss';
import { IoMdMail } from "react-icons/io";
import { PiLockKeyFill } from "react-icons/pi";



const FormLogIn = () => {
  return (
    <form className={style.formLogIn}>
      <div className={style.formLogInInput}>
        <IoMdMail />
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          required
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          title="Please enter a valid email address (e.g., name@example.com)."
        />
      </div>

      <div className={style.formLogInInput}>
        <PiLockKeyFill />
        <input
          type="password"
          placeholder="Password"
          name="psw"
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
          title="Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character."
        />
      </div>

      <button type="submit" className={style.formSelectedBtn}>LOG IN</button>
      <button type="button" className={style.formNotSelectedBtn}>REGISTER</button>
    </form>
  );
};

export default FormLogIn;
