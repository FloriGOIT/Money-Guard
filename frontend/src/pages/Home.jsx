import style from '../components/moneyGuard.module.scss';
import ListCardsMobile from '../components/ListCardsMobile';
import Nav from '../components/Nav';

const Home = ({info,handleDeleteCard}) => {
  return (
    <section className={style.homePageWrapper}>
      <div className={style.homePage}>
        <Nav />
        <ListCardsMobile info={info} handleDeleteCard={handleDeleteCard} />
      </div>
    </section>
  );
};

export default Home;
