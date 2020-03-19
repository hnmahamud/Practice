// const number = [1, 2, 3];
// console.log(number);
//
// const listItem = document.querySelectorAll('li');
// console.log(listItem);
//
// const arrayListItem = Array.from(listItem);
// console.log(arrayListItem);
//
// const hobbies = ['Cooking' , 'Sports'];
// const personalData = [30, 'Max', {moreDetail: []}];
//
// const analyticsData = [[1, 1.6], [-5.4, 2.1]];
// for (const data of analyticsData) {
//     for (const dataPoint of data) {
//         console.log(dataPoint);
//     }
// }
//
// console.log(personalData[1]);

const hobbies = ['Cooking' , 'Sports'];
// hobbies.push('Reading');
// hobbies.pop();
hobbies.unshift('Reading');
hobbies.shift();
hobbies[1] = 'Coding';
//hobbies[5] = 'Reading';
hobbies.splice(0);
console.log(hobbies);

