  const todayNewDate = new Date();
  const year = todayNewDate.getFullYear();
  const month = (todayNewDate.getMonth()+1).toString().padStart(2, "0");
  const day = todayNewDate.getDate().toString().padStart(2, "0")
  const today = `${year}-${month}-${day}`;

const dataCard = [

  {
    date: "2025-06-15",
    type: 'Income',
    category: 'Project',
    details: 'several',
    sum: "58000",
  },

  {
    date: "2025-04-10",
    type: 'Expense',
    category: 'Self Care',
    details: 'Living',
    sum: "8000",
  },

  {
    date: today,
    type: 'Income',
    category: 'Project',
    details: 'Money Guard',
    sum: "600",
  },
    {
    date: today,
    type: 'Expense',
    category: 'Car',
    details: 'Benzina',
    sum: "100",
  },
  {
    date: today,
    type: 'Income',
    category: 'Salary',
    details: 'Monthly',
    sum: "800",
  },

];

export default dataCard;
/*


*/