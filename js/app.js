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
//
// const hobbies = ['Cooking' , 'Sports'];
// hobbies.push('Reading');
// hobbies.pop();
// hobbies.unshift('Reading');
// hobbies.shift();
// hobbies[1] = 'Coding';
// hobbies[5] = 'Reading';
// hobbies.splice(5);
// console.log(hobbies);
//
// const testResult = [1, 5.3, 1.5, 10.99, -5, 10];
// const storedResult = testResult.slice(0, 2);
// const storedResult = testResult.concat([3.99, 2]);
// testResult.push(5.91);
// console.log(storedResult, testResult);
// console.log(testResult.indexOf(5.3));
//
// const personData = [{name: 'Hasan'}, {name: 'Mahamud'}];
// for (let i of personData) {
//     if (i.name === 'Hasan') {
//         console.log(i.name);
//         break;
//     }
// }

const datas = [1, 2, 3, 4, 5];
// for (const i of datas) {
//     console.log(i);
// }

datas.forEach((data, index) => {
    console.log(index + ':' + data);
});