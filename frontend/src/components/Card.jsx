import styles from '../components/moneyGuard.module.scss';
import { Link } from 'react-router-dom';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';

const Card = ({data,handleDeleteCard}) => {
        const {idFrontend, date, type, category, details, amount } = data;
  return (
    <div className={styles.cardwithColor} style={{backgroundColor: type === false ? "rgb(119, 235, 65)": "rgb(207, 47, 47)" }}>
      <div className={styles.card}>
        <div className={styles.cardRow}>
          <span className={styles.cardRowName}>Date</span>
          <span className={styles.cardRowValue}>{date}</span>
        </div>

        <div className={styles.cardRow}>
          <span className={styles.cardRowName}>Type</span>
          <span className={styles.cardRowValue}>{type === false ?"Income":'Expense'}</span>
        </div>

        <div className={styles.cardRow}>
          <span className={styles.cardRowName}>Category</span>
          <span className={styles.cardRowValue}>{category}</span>
        </div>

        <div className={styles.cardRow}>
          <span className={styles.cardRowName}>Details</span>
          <span className={styles.cardRowValue} style={{color:'wheat', textAlign:"end", wordSpacing:"0.3em"}}>{details}</span>
        </div>

        <div className={styles.cardRow}>
          <span className={styles.cardRowName}>Sum</span>
          <span className={styles.cardRowValue}>{new Intl.NumberFormat('fr-FR').format(Number(amount).toFixed(2))}</span>
        </div>

        <div className={styles.cardRowButtons}>
          <button type="button" className={styles.selectedBtn} onClick={()=>handleDeleteCard(idFrontend)}>
            <MdDeleteOutline/>
          </button>
          <Link to={`/card/${idFrontend}`}>
            <button type="button" className={styles.notSelectedBtn}>
              <MdOutlineModeEdit />
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Card;
