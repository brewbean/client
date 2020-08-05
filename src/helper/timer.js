export const timeString = (seconds) => {
  let min = '';
  let sec = '';
  if (seconds >= 60) {
    let minInt = Math.floor(seconds / 60)
    min = minInt + '';
    seconds -= minInt * 60;
  }
  if (seconds < 10) {
    sec = `0${seconds}`;
  } else {
    sec = seconds + '';
  }
  return `${min}:${sec}`;
}