import style from '../components/moneyGuard.module.scss';
import ListCards from '../components/ListCards';

const Home = () => {
  return (
    <section className={style.homePage}>
      <ListCards />
    </section>
  );
};

export default Home;
