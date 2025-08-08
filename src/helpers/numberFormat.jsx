function formatNumber(num) {
  return num
    .toFixed(2)                     // ensures two decimals
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // insert space every 3 digits before decimal
}

console.log(formatNumber(12345.67)); // "12 345.67"


export default formatNumber