export const roundToHalfOrWhole = (num) => {
  let float = parseFloat(num);
  if (isNaN(float)) return 0;
  let decimal = (float - parseInt(float, 10));
  decimal = Math.round(decimal * 10);
  if (decimal === 5) return (parseInt(float, 10) + 0.5); 
  if ((decimal < 3) || (decimal > 7)) return Math.round(float);
  else return parseInt(float, 10) + 0.5;
}