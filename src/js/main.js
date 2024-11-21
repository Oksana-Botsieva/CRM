import '../../node_modules/modern-normalize/modern-normalize.css';
import '../scss/style.scss';
import { setupCounter } from './utils/counter';

window.addEventListener('DOMContentLoaded', () => {
  setupCounter(document.getElementById('counter'));
});
