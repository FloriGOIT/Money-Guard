import style from '../components/moneyGuard.module.scss';
import ListCards from '../components/ListCards';
import Nav from 'components/Nav';

const Home = () => {
  return (
    <section className={style.homePage}>
      <Nav/>
      <ListCards />
    </section>
  );
};

export default Home;
