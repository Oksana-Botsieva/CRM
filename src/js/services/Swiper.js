import Swiper from 'swiper';
import 'swiper/css';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! - Check the imports
// import { Navigation, Pagination } from 'swiper/modules';

/**
 * Класс для инициализации и управления слайдерами.
 * Использует библиотеку Swiper для создания слайдеров с возможностью настройки и управления их поведением.
 */
export class InitSlider {
  /** @type {string} CSS-класс для слайдера. */
  classSlider = '';
  /** @type {HTMLElement|null} Родительский элемент слайдера. */
  classSliderParent = null;
  /** @type {string|null} CSS-класс для элементов заголовков слайдов. */
  classSliderTitles = null;
  /** @type {Object} Настройки слайдера, передаваемые при инициализации. */
  settingsSlider = {};
  /** @type {Swiper|null} Экземпляр слайдера Swiper. */
  slider = null;

  /**
   * Конструктор класса InitSlider.
   *
   * @param {Object} props - Объект с параметрами для слайдера.
   * @param {string} props.classSlider - CSS-класс слайдера.
   * @param {string|null} [props.classSliderParent=null] - CSS-класс родительского элемента слайдера.
   * @param {string|null} [props.classSliderTitles=null] - CSS-класс для заголовков слайдов.
   * @param {Object} props.settingsSlider - Объект с настройками слайдера (для Swiper).
   */
  constructor(props) {
    this.classSlider = props.classSlider;
    this.classSliderParent = props.classSliderParent || null;
    this.classSliderTitles = props.classSliderTitles || null;
    this.settingsSlider = props.settingsSlider;

    this.checkSlider();

    if (this.settingsSlider.destroySize) {
      this.checkResizeSlider();
    }

    this.initTitles();
  }

  /**
   * Проверяет, нужно ли инициализировать или уничтожить слайдер в зависимости от размеров экрана.
   * Если размер экрана соответствует критерию destroySize, слайдер будет уничтожен.
   */
  checkSlider() {
    if (window.matchMedia(this.settingsSlider.destroySize).matches && this.settingsSlider.destroySize) {
      if (this.slider) {
        try {
          this.destroySlider();
        } catch (e) {
          console.log(e);
        }
      }
      return 1;
    } else {
      if (!this.slider) {
        this.initSlider();
      }
    }
  }

  /**
   * Добавляет обработчик события изменения размера окна для проверки и повторной инициализации слайдера.
   */
  checkResizeSlider() {
    window.addEventListener('resize', () => {
      this.checkSlider();
    });
  }

  /**
   * Инициализирует слайдер с использованием библиотеки Swiper.
   */
  initSlider() {
    this.slider = new Swiper(this.classSlider, this.settingsSlider) || null;

    if (this.settingsSlider.pagination) {
      this.slider.on('slideChange', () => {
        this.updatePagination();
      });

      this.updatePagination();
    }
  }

  /**
   * Обновляет состояние пагинации слайдера.
   * Применяет активный класс к текущему элементу пагинации.
   */
  updatePagination() {
    const bullets = document.querySelectorAll(
      `${this.settingsSlider.pagination.el} .${this.settingsSlider.pagination.bulletClass}`,
    );
    const activeClass = this.settingsSlider.pagination.bulletActiveClass;

    bullets.forEach((bullet, index) => {
      if (index === this.slider.realIndex) {
        bullet.classList.add(activeClass);
      } else {
        bullet.classList.remove(activeClass);
      }
    });
  }

  /**
   * Уничтожает слайдер и очищает все его стили.
   */
  destroySlider() {
    this.slider.destroy();
    this.slider = null;
    document.querySelectorAll(`${this.classSlider}`)?.forEach((i) => {
      i.removeAttribute('style');
    });
    document
      .querySelector(`${this.settingsSlider.wrapperClass || 'swiper__wrapper' || this.classSlider}__wrapper`)
      ?.removeAttribute('style');
  }

  /**
   * Инициализирует обработчики для заголовков слайдов, позволяя переключать слайды по клику на заголовок.
   */
  initTitles() {
    if (!this.classSliderParent || !this.classSliderTitles || !this.settingsSlider.pagination.bulletClass) return;

    if (!document.querySelector(`${this.classSliderParent}`)) return;

    const titles = Array.from(
      document.querySelector(`${this.classSliderParent}`).querySelectorAll(`.${this.classSliderTitles}`),
    );

    const paginationItems = document
      .querySelector(`${this.classSlider}`)
      .querySelectorAll(`.${this.settingsSlider.pagination.bulletClass}`);

    if (!titles.length || !paginationItems.length || titles.length !== paginationItems.length) return;

    titles.forEach((title) => {
      title.addEventListener('click', () => {
        paginationItems[titles.indexOf(title)].click();
      });
    });
  }
}

/**
 * Массив с объектами, содержащими параметры и настройки для различных слайдеров.
 *
 * @type {Array<Object>}
 */
const listSliders = [
  // EXAMPLE - EXAMPLE - EXAMPLE - EXAMPLE
  // {
  //   classSlider: '.controlled-slider__inner',
  //   classSliderParent: '.controlled-slider',
  //   classSliderTitles: 'controlled-slider__slides-titles-item',
  //   settingsSlider: {
  //     wrapperClass: 'controlled-slider__wrapper',
  //     slideClass: 'controlled-slider__slide',
  //     modules: [Navigation, Pagination],
  //     grabCursor: true,
  //     slidesPerView: 1,
  //     rewind: true,
  //     spaceBetween: 16,
  //     breakpoints: {
  //       768: {
  //         spaceBetween: 24,
  //       },
  //     },
  //     navigation: {
  //       nextEl: '.controlled-slider__button_next',
  //       prevEl: '.controlled-slider__button_prev',
  //     },
  //     pagination: {
  //       bulletClass: 'controlled-slider__pagination-item',
  //       bulletActiveClass: 'controlled-slider__pagination-item_active',
  //       el: '.controlled-slider__pagination',
  //       clickable: true,
  //     },
  //   },
  // },
  // EXAMPLE - EXAMPLE - EXAMPLE - EXAMPLE
];

/**
 * Инициализирует все слайдеры, используя параметры из массива listSliders.
 *
 * @returns {Array<InitSlider>} Массив экземпляров класса InitSlider.
 */
export const initSwipers = () => {
  return listSliders.map((i) => {
    return new InitSlider(i);
  });
};
