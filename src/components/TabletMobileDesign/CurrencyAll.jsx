import style from '../moneyGuard.module.scss';
import currency from '../../helpers/currencyBNR';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';

const CurrencyAll = () => {
  return (
    <table className={style.currencyTableAll}>
      <thead>
        <tr>
          <th className={style.nonRate}></th>
          <th className={style.withRate}>NBR</th>
          <th className={style.withRate}>Buy</th>
          <th className={style.withRate}>Sell</th>
          <th className={style.nonRate}></th>
          <th className={style.nonRate}></th>
        </tr>
      </thead>
      <tbody>
        {currency.map(el => (
          <tr key={el.id}>
                        <td className={style.nonRate}>{el.currencyName}</td>
            <td className={style.withRate}>{el.nbrRate}</td>
            <td className={style.withRate}>{el.buyRate}</td>
            <td className={style.withRate}>{el.sellRate}</td>
            <td className={style.smallBtn} style={{paddingLeft:"5px"}}>
                <div className={style.deletCurrency}>
                  <MdDeleteOutline />
                </div>
              </td>
              <td className={style.smallBtn} style={{paddingLeft:"10px"}}>
                <div className={style.editCurrency}>
                  <MdOutlineModeEdit />
                </div>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyAll;

/*

    .currencyTable {
      border: 1px solid rgba(206, 204, 204, 0.364);
      width: inherit;
      border-radius: 10px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      padding: 30px 30px 30px 10px;
      
      background-color: rgb(92, 38, 187);
      background-image: url('../helpers/images/graphBackground.jpg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      box-shadow: none;
      min-height: 250px;

      .currencyTableHeader {
        padding-left: 65px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 219px;

        span {
          box-sizing: border-box;
          font-weight: 400;
          font-size: 19px;
          display: block;
          text-align: center;
          width: 73px;
          color: white;
        }
      }

      .currencyTableRow {
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .currencyTableRate {
          font-size: 18px;
          width: 50px;
        }

        .currencyTableNotRate,
        .currencyTableContent {
          font-size: 20px;
          font-weight: 400;
        }
      }

      .editCurrency,
      .deletCurrency {
        padding: 0px;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        height: 28px;
        color: white;
        box-sizing: border-box;
        width: 50px;

        &:hover {
          box-shadow: 2px 2px 3px rgb(66, 3, 124);
        }

        svg {
          padding-top: 5px;
        }
      }

      .deletCurrency {
        background: -webkit-linear-gradient(
          to right,
          #f3a73c,
          hwb(288 30% 11%)
        );
        background: linear-gradient(to right, #f3a73c, hwb(288 30% 11%));
        color: white;
      }

      .editCurrency {
        background-color: white;
        color: rgb(92, 38, 187);
      }
    }

*/
