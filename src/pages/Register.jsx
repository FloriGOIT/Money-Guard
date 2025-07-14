import style from '../components/moneyGuard.module.scss';
import { IoMdMail } from 'react-icons/io';
import { PiLockKeyFill } from 'react-icons/pi';
import { BiSolidUser } from "react-icons/bi";
import Logo from 'components/Logo';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <section className={style.registerWrapper}>
      <Logo />
      <form className={style.form}>
      <div className={style.formInput}>
          <BiSolidUser />
          <input
            type="email"
            name="username"
            placeholder="Name"
            required
            pattern="^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']{2,50}$"
  title="Please enter a valid name. Only letters, spaces, hyphens, and apostrophes are allowed."
          />
        </div>
        <div className={style.formInput}>
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

        <div className={style.formInput}>
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
        
        <div className={style.formInput}>
          <PiLockKeyFill />
          <input
            type="password"
            placeholder="Confirm password"
            name="pswConfirmed"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
            title="Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character."
          />
        </div>
        <Link className={`${style.bigButton} ${style.selectedBtn}`}>
          REGISTER
        </Link>
        <Link to="/login" className={`${style.bigButton} ${style.notSelectedBtn}`}>
          LOG IN
        </Link>

      </form>
    </section>
  );
};

export default Register;
