export const months = [
  { number: '01', name: 'January' },
  { number: '02', name: 'February' },
  { number: '03', name: 'March' },
  { number: '04', name: 'April' },
  { number: '05', name: 'May' },
  { number: '06', name: 'June' },
  { number: '07', name: 'July' },
  { number: '08', name: 'August' },
  { number: '09', name: 'September' },
  { number: '10', name: 'October' },
  { number: '11', name: 'November' },
  { number: '12', name: 'December' },
];
export const years = [
  { number: '2025', name: '2025' },
  { number: '2026', name: '2026' },
  { number: '2027', name: '2027' },
  { number: '2028', name: '2028' },
  { number: '2029', name: '2029' },
  { number: '2030', name: '2030' },
];

export const todayNewDate = new Date();
export const currentYear = todayNewDate.getFullYear();
export const currentMonth = (todayNewDate.getMonth() + 1)
  .toString()
  .padStart(2, '0');
export const currentDay = todayNewDate.getDate().toString().padStart(2, '0');
export const today = `${currentYear}-${currentMonth}-${currentDay}`;

