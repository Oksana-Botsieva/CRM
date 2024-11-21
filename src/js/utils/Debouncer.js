/**
 * @class Debouncer
 * @description Класс для реализации функции debounce, которая ограничивает количество вызовов функции callee в указанный интервал времени.
 */

export class Debouncer {
  constructor() {
    this.lastCall = 0; // Инициализация свойства lastCall
  }

  /**
   * Оборачивает функцию, добавляя к ней задержку (debounce).
   * @param {Function} callee - Функция, которую необходимо обернуть в debounce.
   * @param {number} timeoutMs - Время задержки в миллисекундах.
   * @returns {Function} - Обернутая функция с задержкой.
   */
  debounce(callee, timeoutMs) {
    return (...args) => {
      const previousCall = this.lastCall;
      this.lastCall = Date.now();

      if (previousCall && this.lastCall - previousCall <= timeoutMs) {
        clearTimeout(this.lastCallTimer);
      }

      this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
    };
  }
}
