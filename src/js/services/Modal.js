import { fadeIn, fadeOut } from '../animations/fade-animation';

/**
 * Класс `Modal` управляет отображением модальных окон на странице, их состояниями и анимацией.
 */
export class Modal {
  /**
   * @property {HTMLElement} $modal - Элемент модального окна.
   * @property {HTMLElement|null} $closeButton - Кнопка закрытия модального окна.
   * @property {HTMLElement|null} $backdrop - Фон, который появляется позади модального окна.
   * @property {HTMLElement[]|null} otherModals - Коллекция других модальных окон на странице.
   * @property {NodeList|null} calledButtonsCollection - Кнопки, вызывающие данное модальное окно.
   */

  $modal = null;
  $closeButton = null;
  $backdrop = null;

  otherModals = null;
  calledButtonsCollection = null;

  /**
   * @property {string} modalClassName - Основной CSS-класс для модального окна.
   * @static
   */
  static modalClassName = 'modal';

  /**
   * @property {string} backdropClassName - CSS-класс для фона позади модального окна (backdrop).
   * @static
   */
  static backdropClassName = 'backdrop';

  /** @enum {Object} - CSS классы, используемые для элементов модального окна */
  static classNames = {
    closeButton: `${Modal.modalClassName}__close-button`,
  };

  /** @enum {Object} - Атрибуты, используемые для управления состоянием модального окна */
  static attrs = {
    calledButton: 'data-call-modal',
    modalName: 'data-modal-name',
    state: 'data-modal-state',
  };

  /** @enum {Object} - Состояния, используемые для управления видимостью модальных окон */
  static states = {
    initialized: 'initialized',
    showing: 'showing',
    hidden: 'hidden',
  };

  /**
   * Создаёт экземпляр модального окна.
   * @param {HTMLElement} $modal - Модальный элемент, который будет управляться этим экземпляром.
   * @param {HTMLElement|null} [$backdrop=null] - Фон позади модального окна.
   * @param {HTMLElement[]} [otherModals=null] - Массив других модальных окон на странице.
   */
  constructor($modal, $backdrop = null, otherModals) {
    this.$modal = $modal;
    this.otherModals = otherModals || null;
    this.$backdrop = $backdrop || document.querySelector(`body > .${Modal.backdropClassName}`) || null;

    this.getElements();
    this.addEvents();
    this.setState(Modal.states.initialized);
  }

  /**
   * Получает элементы управления модальным окном, такие как кнопка закрытия и связанные кнопки вызова.
   */
  getElements() {
    this.$closeButton = this.$modal.querySelector(`.${Modal.classNames.closeButton}`);
    this.calledButtonsCollection = document.querySelectorAll(
      `[${Modal.attrs.calledButton}="${this.$modal.getAttribute(Modal.attrs.modalName)}"]`,
    );
  }

  /**
   * Добавляет обработчики событий для элементов управления модальным окном.
   */
  addEvents() {
    this.calledButtonsCollection.forEach(($calledButton) =>
      $calledButton.addEventListener('click', this.show.bind(this)),
    );

    this.$closeButton.addEventListener('click', this.hide.bind(this));
    this.$backdrop && this.$backdrop.addEventListener('click', this.hideAll.bind(this));
  }

  /**
   * Показывает модальное окно с анимацией и блокирует прокрутку страницы.
   */
  show() {
    document.body.style.overflow = 'hidden';

    this.showBackdrop();
    this.checkOpened();
    fadeIn(this.$modal, { scale: 0.97 });
    this.setState(Modal.states.showing);
  }

  /**
   * Скрывает модальное окно с анимацией. Может также скрыть фон.
   * @param {boolean} [notHideBackdrop=false] - Указывает, нужно ли оставлять фон видимым.
   */
  hide(notHideBackdrop = false) {
    let count = 0;

    fadeOut(this.$modal, { duration: 0.15 });
    this.setState(Modal.states.initialized);

    this.otherModals?.forEach(($modal) => {
      if ($modal.getAttribute(Modal.attrs.state) === Modal.states.hidden) {
        fadeIn($modal);
        $modal.setAttribute(Modal.attrs.state, Modal.states.showing);
        ++count;
      }
    });

    if (count === 0 || !notHideBackdrop) {
      this.hideBackdrop();
    }

    document.body.style.removeProperty('overflow');
  }

  /**
   * Скрывает все модальные окна и фон.
   */
  hideAll() {
    this.otherModals?.forEach(($modal) => {
      if ($modal.getAttribute(Modal.attrs.state) === Modal.states.hidden) {
        $modal.setAttribute(Modal.attrs.state, Modal.states.initialized);
        fadeOut($modal, { duration: 0.01 });
      }
    });
    this.hide();
  }

  /**
   * Показывает фон с анимацией, если он не отображается.
   */
  showBackdrop() {
    if (!this.$backdrop || this.$backdrop.getAttribute(Modal.attrs.state) === Modal.states.showing) {
      return;
    }

    this.$backdrop.setAttribute(Modal.attrs.state, Modal.states.showing);
    fadeIn(this.$backdrop, { opacity: 0.5, zIndex: 109 });
  }

  /**
   * Скрывает фон с анимацией, если он отображается.
   */
  hideBackdrop() {
    if (!this.$backdrop || this.$backdrop.getAttribute(Modal.attrs.state) !== Modal.states.showing) {
      return;
    }

    this.$backdrop.removeAttribute(Modal.attrs.state);
    fadeOut(this.$backdrop, { duration: 0.15 });
  }

  /**
   * Устанавливает состояние модального окна.
   * @param {string} state - Новое состояние модального окна.
   */
  setState(state) {
    if (Modal.states[state]) {
      this.$modal.setAttribute(Modal.attrs.state, Modal.states[state]);
    }
  }

  /**
   * Проверяет, есть ли открытые модальные окна, и скрывает их.
   */
  checkOpened() {
    this.otherModals?.forEach(($modal) => {
      if ($modal.getAttribute(Modal.attrs.state) === Modal.states.showing) {
        fadeOut($modal);
        $modal.setAttribute(Modal.attrs.state, Modal.states.hidden);
      }
    });
  }
}

/** Массив инициализированных модальных окон */
export const initializedModals = [];

/**
 * Инициализирует все модальные окна на странице, кроме исключённых.
 * @function
 */
export function initModals() {
  const notInitializedOnLoading = ['thank-you', 'services-bubble', 'burger-menu'];

  const modals = Array.from(document.querySelectorAll(`.${Modal.modalClassName}`));
  const $backdrop = document.querySelector(`body > .${Modal.backdropClassName}`);

  modals.forEach(($modal) => {
    if (!notInitializedOnLoading.includes($modal.getAttribute('data-modal-name'))) {
      const modal = new Modal(
        $modal,
        $backdrop,
        modals.filter((m) => m !== $modal),
      );

      initializedModals.push(modal);
    }
  });
}
