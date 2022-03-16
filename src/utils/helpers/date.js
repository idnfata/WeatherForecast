export function hourAMPMFormat(dt) {
  let date = new Date(Number(dt) * 1000);
  //   console.log('dt', dt);
  //   console.log('date', date);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  // let strTime = hours + ':' + minutes + ' ' + ampm;
  let strTime = hours + ampm;
  return strTime;
}
