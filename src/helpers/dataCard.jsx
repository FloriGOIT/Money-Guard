const today = new Date().toLocaleDateString('ro-Ro', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});
const dataCard = [
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