const today = new Date().toLocaleDateString('ro-Ro', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});
console.log("today",today)
const dataCard = [

  {
    date: "15.06.2025",
    type: 'Income',
    category: 'Project',
    details: 'several',
    sum: 58000,
  },

  {
    date: "19.04.2025",
    type: 'Expense',
    category: 'Self Care',
    details: 'Living',
    sum: 8000,
  },

  {
    date: today,
    type: 'Income',
    category: 'Project',
    details: 'Money Guard',
    sum: 600,
  },
    {
    date: today,
    type: 'Expense',
    category: 'Car',
    details: 'Benzina',
    sum: 100,
  },
  {
    date: today,
    type: 'Income',
    category: 'Salary',
    details: 'Monthly',
    sum: 800,
  },

];

export default dataCard;
/*


*/