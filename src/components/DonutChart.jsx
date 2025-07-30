import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import style from './moneyGuard.module.scss';

const CustomTooltip = ({ active, payload, info }) => {
  if (active && payload && payload.length) {
    const { category, total, color } = payload[0].payload;
    const totalSum = info.reduce((acc, item) => acc + item.total, 0);
    const percentage = ((total / totalSum) * 100).toFixed(1);

    return (
      <div
        style={{
          background: '#1f1f1f',
          padding: '8px 8px',
          borderRadius: '10px',
          color: '#fff',
          border: `2px solid ${color}`,
          boxShadow: '0 0 5px rgba(0,0,0,0.3)',
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>
          {category}
        </p>
        <p style={{ margin: 0, fontSize: '14px' }}>{percentage}%</p>
      </div>
    );
  }

  return null;
};

const DonutChart = ({ info }) => {
  const totalSum = info.reduce((acc, item) => acc + item.total, 0);

  return (
    <div
      style={{ textAlign: 'center', width: '300px', margin: '0 auto', position:"static" }}
      className={style.chart}
    >

      <div style={{ margin: '0 auto', position:"relative" }}>
        <PieChart width={285} height={285} style={{ margin: '0 auto' }}>
          <Pie
            data={info}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            dataKey="total"
            nameKey="category"
          >
            {info.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} info={info} />
        </PieChart>

        {/* Center text */}
        <div
          style={{
            position: 'absolute',
            top: '120px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 'bold',
            fontSize: '28px',
            color: 'white',
            paddingLeft:"10px"
          }}
        >
          {totalSum.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
