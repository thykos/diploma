export function splitNumber(number) {
  return number.split('').map((number, idx) => {
    if (idx % 4 === 0) return ' ' + number;
    return number
  }).join('');
}
