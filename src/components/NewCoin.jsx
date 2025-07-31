import style from './moneyGuard.module.scss';
import BigButtonsContainer from './BigButtonsContainer';

const NewCoin = () => {
  const handleNewCoin = value => {
    console.log(value);
  };

  return (
    <section className={style.newCoinWrapper}>
      <div className={style.newCoinContainer}>
        <form onSubmit={handleNewCoin} className={style.newCoinForm}>
          <input
            type="text"
            name="currencyName"
            pattern="^\d+(\.\d{1,4})?$"
            title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
            required
            autoComplete="off"
                                          placeholder="Currency name"
                                          
                                          
          />
          <input
            type="text"
            name="nbrRate"
            pattern="^\d+(\.\d{1,4})?$"
            title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
            required
            autoComplete="off"
            placeholder="Central bank rate"
          />
          <input
            type="text"
            name="buyRate"
            pattern="^\d+(\.\d{1,4})?$"
            title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
            required
            autoComplete="off"
            placeholder="Buy rate"
          />
          <input
            type="text"
            name="sellRate"
            pattern="^\d+(\.\d{1,4})?$"
            title="Number with up to 4 decimal places. Use dot as separator. Example: 5.00"
            required
            autoComplete="off"
            placeholder="Sell rate"
          />
          <div className={style.newCoinFormButtons}>
            <BigButtonsContainer firstBtn="Add" secondBtn="Close" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewCoin;
