import '../../node_modules/modern-normalize/modern-normalize.css';
import '../scss/style.scss';
import { testFunc } from './testFunc';

console.log('hello');

testFunc('i am test function');

[1, 2, 3].forEach((item) => {
  console.log(item);
});
