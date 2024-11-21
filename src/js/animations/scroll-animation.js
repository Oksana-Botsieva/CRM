import gsap from 'gsap';
/* gsap plugins */
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { handleAboutHrefScroll } from '../utils/handleAboutHrefScroll';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

/**
 * Инициализирует анимации при прокрутке страницы, включая эффекты для hero, шапки, секций и карточек.
 */
export function scrollAnimation() {
  // Анимация hero
  createHeroAnimation('.hero *');

  // Анимация шапки с небольшим баунсом
  createHeaderAnimation('header.header');

  // Анимация появления секций снизу
  createSectionsSwipeFromBottomAnimation('section:not(.hero):not(.services__service)');

  // Анимация въезда с разных сторон карточек 3 концепций
  createSectionsSwipeFromSidesAnimation('.approaches-card');
}

if (window.localStorage.getItem('about_href')) {
  handleAboutHrefScroll();
  window.localStorage.removeItem('about_href');
}

/**
 * Создаёт анимацию появления элементов hero-секции при загрузке страницы.
 *
 * @param {string} selector - Селектор элементов, к которым применяется анимация.
 * @returns {gsap.core.Tween|null} Анимация или null, если элементы не найдены.
 */
function createHeroAnimation(selector) {
  return document.querySelector(selector)
    ? gsap.fromTo(
        selector,
        { autoAlpha: 0, y: '1rem' },
        { duration: 1, autoAlpha: 1, y: '0', stagger: 0.15, ease: 'power3.inOut' },
      )
    : null;
}

/**
 * Создаёт анимацию для шапки с эффектом баунса.
 *
 * @param {string} selector - Селектор элемента шапки.
 * @returns {gsap.core.Tween|null} Анимация или null, если элемент не найден.
 */
function createHeaderAnimation(selector) {
  return document.querySelector(selector)
    ? gsap.fromTo(selector, { autoAlpha: 0, y: '-10rem' }, { autoAlpha: 1, y: 0, ease: 'back(2)', duration: 1 })
    : null;
}

/**
 * Создаёт анимацию появления секций снизу при прокрутке страницы.
 * Каждая секция появляется при достижении 75% высоты окна просмотра.
 *
 * @param {string} selector - Селектор секций, к которым применяется анимация.
 */
function createSectionsSwipeFromBottomAnimation(selector) {
  return document.querySelector(selector)
    ? gsap.utils.toArray(selector).forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        });

        tl.from(section, {
          y: '15rem',
          opacity: 0,
        }).to(section, {
          yPercent: 0,
          opacity: 1,
        });
      })
    : null;
}

/**
 * Создаёт анимацию для карточек, которые въезжают с разных сторон экрана при прокрутке.
 * Чередует направление движения для чётных и нечётных карточек.
 *
 * @param {string} selector - Селектор карточек, к которым применяется анимация.
 */
function createSectionsSwipeFromSidesAnimation(selector) {
  return document.querySelector(selector)
    ? gsap.utils.toArray(selector).forEach((section, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top center',
          },
        });

        const xDirection = index % 2 === 0 ? 100 : -100;
        tl.from(section, { xPercent: xDirection }).to(section, { xPercent: 0 });
      })
    : null;
}
