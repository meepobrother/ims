const Mobx = require("mobx");
const { observable, autorun, computed } = Mobx;
var numbers = observable([1, 2, 3]);
autorun(() => console.log(numbers.length));
// 输出 '3'
numbers.push(4);
// 输出 '4'
numbers[0] = 0;
// 输出 '4'
