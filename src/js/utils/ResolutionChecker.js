/**
 * Класс для проверки разрешения экрана устройства.
 * Предназначен для определения, какой тип устройства используется (ноутбук, планшет, мобильный телефон).
 */
class ResolutionChecker {
  /**
   * Конструктор класса. Инициализирует разрешения для разных типов устройств.
   */
  constructor() {
    /**
     * Разрешение для ноутбуков.
     * @type {number}
     */
    this.laptopResolution = 1399;

    /**
     * Разрешение для планшетов.
     * @type {number}
     */
    this.tabletResolution = 1199;

    /**
     * Разрешение для мобильных устройств.
     * @type {number}
     */
    this.mobileResolution = 767;

    /**
     * Разрешение для дополнительных мобильных устройств.
     * @type {number}
     */
    this.extraMobileResolution = 370;
  }

  /**
   * Проверяет, является ли устройство ноутбуком.
   * @returns {boolean} Возвращает true, если разрешение экрана соответствует ноутбуку, иначе false.
   */
  isLaptop() {
    return this.check(this.laptopResolution);
  }

  /**
   * Проверяет, является ли устройство планшетом.
   * @returns {boolean} Возвращает true, если разрешение экрана соответствует планшету, иначе false.
   */
  isTablet() {
    return this.check(this.tabletResolution);
  }

  /**
   * Проверяет, является ли устройство мобильным телефоном.
   * @returns {boolean} Возвращает true, если разрешение экрана соответствует мобильному устройству, иначе false.
   */
  isMobile() {
    return this.check(this.mobileResolution);
  }

  /**
   * Проверяет, является ли устройство дополнительным мобильным устройством.
   * @returns {boolean} Возвращает true, если разрешение экрана соответствует дополнительному мобильному устройству, иначе false.
   */
  isExtra() {
    return this.check(this.extraMobileResolution);
  }

  /**
   * Проверяет, соответствует ли разрешение экрана переданному значению.
   * @param {number} resolution Разрешение экрана в пикселях, с которым нужно сравнить текущее разрешение.
   * @returns {boolean} Возвращает true, если текущее разрешение экрана меньше или равно переданному, иначе false.
   */
  isCustom(resolution) {
    return this.check(resolution);
  }

  /**
   * Проверяет, соответствует ли текущее разрешение экрана переданному значению.
   * @param {number} resolution Разрешение экрана в пикселях, с которым нужно сравнить текущее разрешение.
   * @returns {boolean} Возвращает true, если текущее разрешение экрана меньше или равно переданному, иначе false.
   * @private
   */
  check(resolution) {
    try {
      return window?.matchMedia(`(max-width: ${resolution}px)`)?.matches || false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

/**
 * Экземпляр класса ResolutionChecker, используемый для проверки разрешений экрана.
 * @type {ResolutionChecker}
 */
export const resolutionChecker = new ResolutionChecker();
