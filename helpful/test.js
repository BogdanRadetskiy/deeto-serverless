// const MINUTE = 60000
// const HOUR = MINUTE * 60
// const DAY = HOUR * 24
// const WEEK = DAY * 7
// const MONTH = WEEK * 4
//
//
// function knownForCalculateFriendlyText(createdAt) {
//   const diff = Date.now() - createdAt;
//   const days = diff / DAY
//
//   if (days < DAY * 7) {
//     return days
//   }
//   else if (days < DAY * 11) {
//     return '1 Week'
//   }
//   else if (days < DAY * 90) {
//     const weeks = Math.ceil(days / 7)
//     return `${weeks} week`
//   }
// }
//
// console.log(knownForCalculateFriendlyText(1664252302577));


const count = 12

switch (true) {
  case count > 15:
    console.log('count > 15');
    break;
  case count > 10:
    console.log('count > 10');
    break;
}
