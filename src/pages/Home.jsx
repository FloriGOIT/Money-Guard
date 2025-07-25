import style from '../components/moneyGuard.module.scss';
import ListCards from '../components/ListCards';
import Nav from 'components/Nav';

const Home = ({info,handleDeleteCard}) => {
  return (
    <section className={style.homePageWrapper}>
      <div className={style.homePage}>
        <Nav />
        <ListCards info={info} handleDeleteCard={handleDeleteCard} />
      </div>
    </section>
  );
};

export default Home;
