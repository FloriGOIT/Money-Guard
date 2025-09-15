import style from './moneyGuard.module.scss';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const SharedLayout = () => {
  return (
    <section className={style.sharedLayoutWrapper}>
      <Header />

      <Outlet />
    </section>
  );
};
export default SharedLayout;
