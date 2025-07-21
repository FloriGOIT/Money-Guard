import style from '../components/moneyGuard.module.scss';
import Logo from '../components/Logo';
import FormLogIn from 'components/FormLogIn';

const Login = () => {
  return (
    <section className={style.logRegWrapper}>
      <div className={style.loginContainer}>
        <Logo />
        <FormLogIn />
      </div>
    </section>
  );
};

export default Login;
