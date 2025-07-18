import styles from '../components/moneyGuard.module.scss';
 
import { MdOutlineModeEdit } from 'react-icons/md';

const Card = ({data}) => {
        const { date, type, category, details, sum } = data;
  return (
    <div className={styles.cardwithColor} style={{backgroundColor: `${type}` === "Expense" ? "rgb(207, 47, 47)" : "rgb(119, 235, 65)"}}>
      <div className={styles.card}>
        <div className={styles.cardRow}>
          <span className={styles.cardRowName}>Date</span>
          <span className={styles.cardRowValue}>{date}</span>
        </div>

        <div className={styles.cardRow}>
          <span className={styles.cardRowName}>Type</span>
          <span className={styles.cardRowValue}>{type}</span>
        </div>

        <div className={styles.cardRow}>
          <span className={styles.cardRowName}>Category</span>
          <span className={styles.cardRowValue}>{category}</span>
        </div>

        <div className={styles.cardRow}>
          <span className={styles.cardRowName}>Details</span>
          <span className={styles.cardRowValue}>{details}</span>
        </div>

        <div className={styles.cardRow}>
          <span className={styles.cardRowName}>Sum</span>
          <span className={styles.cardRowValue}>{sum}</span>
        </div>

        <div className={styles.cardRowButtons}>
          <button type="button" className={styles.selectedBtn}>
            Delete
          </button>
          <button type="button" className={styles.notSelectedBtn}>
            <MdOutlineModeEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
