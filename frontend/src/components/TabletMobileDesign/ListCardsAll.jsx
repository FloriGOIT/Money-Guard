import style from '../../components/moneyGuard.module.scss';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { ImMinus } from 'react-icons/im';
import { PiPlusMinusBold } from 'react-icons/pi';
import { ImPlus } from 'react-icons/im';
import AddButton from './AddButton';

const ListCardsAll = ({ info, isYearMonthForFilter,handleAddCardModal,handleDeleteCard,handleIdForCardUpdate }) => {
  
  const filteredInfoOnPeriod = info.filter(el => Number(el.year) === Number(isYearMonthForFilter.year))
                                   .filter(el => {if(isYearMonthForFilter.month === "-"){ return el }
                                   else { return el.month === isYearMonthForFilter.month }
                                   })
  const handleAddNewCard = () => { handleAddCardModal(); handleIdForCardUpdate("") }
  
  return (
    <div className={style.listCardsTabletContainer}>
      <table>
        <thead>
          <tr>
            <th  style={{width: "100px"}}>Date</th>
            <th className={style.piPlusMinusBold}>
              <PiPlusMinusBold className={style.plusMinus} />
            </th>
            <th style={{width: "100px"}}>Category</th>
            <th >Comment</th>
            <th style={{width: "80px"}}>Sum</th>
            <th onClick={handleAddNewCard}><AddButton /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredInfoOnPeriod.map(card => (
            <tr key={card.idFrontend} >
              <td className={style.cardDate} style={{width: "100px"}}>{card.date}</td>
              <td className={style.cardType}>
                {card.type ? <ImPlus className={style.imPlus}/> : <ImMinus className={style.imMinus}/>}
              </td>
              <td className={style.cardCategory} style={{width: "100px"}}>{card.category}</td>
              <td className={style.cardDetails} >{card.details}</td>
              <td className={style.cardAmount} style={{width: "80px"}}>{new Intl.NumberFormat('fr-FR').format(Number(card.amount).toFixed(2))}</td>
              <td className={style.cardButton} style={{ padding: "0px 5px 5px 5px" }} onClick={() =>handleDeleteCard(card.idFrontend)}>
                <div className={style.deletCurrency} >
                  <MdDeleteOutline />
                </div>
              </td>
              <td className={style.cardButton} style={{ padding: "0px 5px 5px 5px" }} onClick={() => { handleIdForCardUpdate(card.idFrontend);; handleAddCardModal()}}>
                <div className={style.editCurrency} >
                  <MdOutlineModeEdit/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCardsAll;


