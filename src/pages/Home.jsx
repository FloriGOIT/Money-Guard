import style from '../components/moneyGuard.module.scss';
import ListCards from '../components/ListCards';
import Nav from 'components/Nav';

const Home = ({info}) => {
  return (
    <section className={style.homePageWrapper}>
      <div className={style.homePage}>
        <Nav />
        <ListCards info={info} />
      </div>
    </section>
  );
};

export default Home;
