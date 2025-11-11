import style from './moneyGuard.module.scss';

const Balance = ({ info }) => {
  const balance = info.reduce((acc, data) => {
    if (data.type === false) {
      return acc + Number(data.amount);
    } else if (data.type === true) {
      return acc - Number(data.amount);
    }
    return acc;
  }, 0);

  return (
    <div className={style.totalSum}>
      <p> Balance: </p>
      <p>
        <span
          style={{
            color: balance <= 0 ? '#be242496' : 'rgb(194, 240, 126)',
            fontWeight: 900,
          }}
        >
          {' '}
          {new Intl.NumberFormat('fr-FR').format(balance.toFixed(2))}
        </span>
        <span style={{marginLeft: "10px"}}>RON</span>
      </p>
    </div>
  );
};

export default Balance;
