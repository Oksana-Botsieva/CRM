/* global ymaps */

/**
 * Класс для инициализации и отображения карты Яндекс на странице.
 * Создаёт карту с маркером и стандартными контролами.
 */
class YaMap {
  /**
   * Элемент блока карты.
   * @type {HTMLElement}
   */
  $block = null;

  /**
   * Идентификатор блока карты.
   * @type {string|null}
   */
  blockId = null;

  /**
   * Атрибуты для получения данных карты.
   * @type {Object}
   * @property {string} cords Атрибут для хранения координат карты.
   */
  attrs = {
    cords: 'data-cords',
  };

  /**
   * Конструктор класса.
   * @param {HTMLElement} $block Элемент блока, в котором отображается карта.
   */
  constructor($block) {
    this.$block = $block;
    this.blockId = this.$block.getAttribute('id');

    ymaps.ready(() => this.initMap());
  }

  /**
   * Инициализация карты Яндекс.
   * Создаёт карту с заданными координатами и добавляет маркер и контролы.
   * @private
   */
  initMap() {
    const cords = this.getCords();
    if (!cords?.length) return;

    var myMap = new ymaps.Map(this.blockId, {
      center: cords,
      zoom: 14,
      controls: [],
    });

    // Добавление контролов с настройками
    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        // position: { left: 5, top: 200 },
      },
    });
    var typeSelector = new ymaps.control.TypeSelector();
    var fullscreenControl = new ymaps.control.FullscreenControl();

    myMap.controls.add(zoomControl);
    myMap.controls.add(typeSelector);
    myMap.controls.add(fullscreenControl);

    // Добавление маркера
    const marker = new ymaps.Placemark(cords, null, {
      // iconLayout: 'default#image',
      // iconImageHref: '/local/templates/main/build/image/icon_map.svg',
      // iconImageSize: [40, 40],
      // iconImageOffset: [-15, -44],
    });

    myMap.geoObjects.add(marker);
  }

  /**
   * Получение координат карты из атрибута блока.
   * @returns {Array|null} Массив координат (широта, долгота) или null, если атрибут не найден.
   */
  getCords() {
    return this.$block.hasAttribute(this.attrs.cords) ? this.$block.getAttribute(this.attrs.cords).split(',') : null;
  }
}

/**
 * Инициализация карты Яндекс для всех элементов на странице с атрибутом data-ymap.
 * @function
 */
export function initYaMap() {
  document.querySelectorAll('[data-ymap]').forEach(($map) => {
    new YaMap($map);
  });
}
