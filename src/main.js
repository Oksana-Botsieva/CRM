import Handlebars from 'handlebars';
import templateSrc from './components/template.hbr?raw';

const template = Handlebars.compile(templateSrc);
const data = {
  title: 'Oksana',
  description: 'settings Handlebars',
};

document.body.innerHTML = template(data);
