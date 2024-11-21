/**
 * Класс для реализации функционала вкладок (Tabs) на веб-странице.
 * Позволяет переключать вкладки и отображать соответствующий контент.
 */
class Tabs {
  /**
   * Статический объект, содержащий атрибуты для поиска элементов вкладок и блоков контента.
   * @static
   * @type {Object}
   * @property {string} tab Атрибут для выбора элементов вкладок.
   * @property {string} tabContent Атрибут для выбора элементов контента вкладки.
   * @property {string} tabParent Атрибут для выбора родительского элемента с вкладками.
   */
  static attrs = {
    tab: 'data-tab',
    tabContent: 'data-tab-content',
    tabParent: 'data-tab-parent',
  };

  /**
   * Создаёт экземпляр класса и инициализирует вкладки и блоки контента.
   * @param {HTMLElement} $parentBlock Родительский блок, содержащий вкладки и контент.
   */
  constructor($parentBlock) {
    /**
     * Родительский элемент, в котором находятся вкладки и блоки контента.
     * @type {HTMLElement}
     */
    this.$parentBlock = $parentBlock;

    /**
     * Список элементов вкладок.
     * @type {NodeListOf<HTMLElement>}
     */
    this.tabs = this.getItems(Tabs.attrs.tab);

    /**
     * Список блоков контента для каждой вкладки.
     * @type {NodeListOf<HTMLElement>}
     */
    this.tabContentBlocks = this.getItems(Tabs.attrs.tabContent);

    /**
     * Индекс активной вкладки.
     * @type {number|null}
     */
    this.activeIndex = null;

    // Если вкладки и блоки контента существуют, инициализируем их.
    if (!this.tabs.length || !this.tabContentBlocks.length) return;

    this.prepare();
    this.addEvents();
  }

  /**
   * Получает элементы, соответствующие заданному атрибуту.
   * @param {string} dataAttr Атрибут, по которому нужно искать элементы.
   * @returns {NodeListOf<HTMLElement>} Список элементов, соответствующих атрибуту.
   */
  getItems(dataAttr) {
    return this.$parentBlock.querySelectorAll(`[${dataAttr}]`);
  }

  /**
   * Подготавливает вкладки и устанавливает активную вкладку по умолчанию.
   * Если в URL есть хеш, активируется соответствующая вкладка.
   */
  prepare() {
    if (window.location.hash?.slice(1)) {
      this.activeIndex = window.location.hash
        ? Array.from(this.tabs).findIndex(
            ($tab) => $tab.getAttribute(`${Tabs.attrs.tab}`) === window.location.hash.slice(1),
          )
        : 0;
    } else {
      this.activeIndex = 0;
    }

    if (this.activeIndex < 0) this.activeIndex = 0;

    this.tabs[this.activeIndex].classList.add('active');
    this.showTabContentBlock();
  }

  /**
   * Добавляет обработчики событий на клик по вкладкам.
   */
  addEvents() {
    this.tabs.forEach(($tab) => {
      $tab.addEventListener('click', this.switch.bind(this));
    });
  }

  /**
   * Переключает вкладки при клике на них.
   * @param {Event} event Событие клика по вкладке.
   */
  switch(event) {
    const { currentTarget } = event;

    this.setHash(currentTarget);
    this.activateTab(currentTarget);
    this.showTabContentBlock();
  }

  /**
   * Устанавливает хеш в URL, соответствующий выбранной вкладке.
   * @param {HTMLElement} target Элемент вкладки, на которую был клик.
   */
  setHash(target) {
    window.location.hash = target.getAttribute(`${Tabs.attrs.tab}`);
  }

  /**
   * Активирует вкладку и деактивирует остальные.
   * @param {HTMLElement} target Элемент вкладки, которая должна стать активной.
   */
  activateTab(target) {
    this.tabs.forEach(($tab, idx) => {
      if ($tab === target) {
        $tab.classList.add('active');
        this.activeIndex = idx;
      } else {
        $tab.classList.remove('active');
      }
    });
  }

  /**
   * Показывает или скрывает блоки контента в зависимости от активной вкладки.
   */
  showTabContentBlock() {
    this.tabContentBlocks.forEach(($block) =>
      $block.classList[
        `${
          $block.getAttribute(`${Tabs.attrs.tabContent}`) !==
          this.tabs[this.activeIndex].getAttribute(`${Tabs.attrs.tab}`)
            ? 'add'
            : 'remove'
        }`
      ]('hidden'),
    );
  }
}

/**
 * Инициализирует вкладки на всех элементах с атрибутом data-tab-parent.
 */
export function initTabs() {
  document.querySelectorAll(`[${Tabs.attrs.tabParent}]`).forEach(($tabsParent) => {
    new Tabs($tabsParent);
  });
}
