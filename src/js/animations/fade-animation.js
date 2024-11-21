import gsap from 'gsap';

const defaultProps = {
  duration: 0.3,
  scale: 1,
  zIndex: 110,
  opacity: 1,
};

/**
 * Выполняет анимацию появления (fade-in) для указанного элемента.
 *
 * @param {HTMLElement} $element - Элемент, который необходимо показать с анимацией.
 * @param {Object} [props=null] - Параметры анимации.
 * @param {number} [props.duration=0.3] - Длительность анимации в секундах.
 * @param {number} [props.scale=1] - Начальное значение масштабирования элемента.
 * @param {number} [props.zIndex=110] - z-index, с которого будет начинаться анимация.
 * @param {number} [props.opacity=1] - Конечная прозрачность элемента.
 */
export function fadeIn($element, props = null) {
  gsap.to($element, {
    startAt: {
      display: 'block',
      zIndex: props?.zIndex || defaultProps.zIndex,
      opacity: 0,
      scale: props?.scale || defaultProps.scale,
    },
    ease: 'power2.inOut',
    opacity: props?.opacity || defaultProps.opacity,
    scale: 1,
    duration: props?.duration || defaultProps.duration,
  });
}

/**
 * Выполняет анимацию исчезновения (fade-out) для указанного элемента.
 *
 * @param {HTMLElement} $element - Элемент, который необходимо скрыть с анимацией.
 * @param {Object} [props=null] - Параметры анимации.
 * @param {number} [props.duration=0.3] - Длительность анимации в секундах.
 * @param {number} [props.scale=1] - Конечное значение масштабирования элемента перед скрытием.
 *
 * @description После завершения анимации элемент становится невидимым (display: 'none') и его `zIndex` уменьшается для исключения из потока.
 */
export function fadeOut($element, props = null) {
  gsap.to($element, {
    ease: 'power2.out',
    opacity: 0,
    scale: props?.scale || 1,
    duration: props?.duration || defaultProps.duration,
    onComplete: () => {
      gsap.set($element, { display: 'none', zIndex: -1000 });
    },
  });
}
