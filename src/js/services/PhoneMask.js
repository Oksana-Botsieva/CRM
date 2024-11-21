/**
 * Класс, представляющий маску для ввода телефонного номера.
 */
class PhoneMask {
  control = null;

  /**
   * Создает экземпляр PhoneMask.
   * @param {Object} props - Объект с параметрами для инициализации.
   * @param {HTMLElement} props.control - Элемент управления, к которому применяется маска.
   */
  constructor(props) {
    this.control = props.control;
    this.setEventsHandlers();
    this.addEventListeners();
    return this;
  }

  /**
   * Добавляет обработчики событий к полю ввода.
   * @description Устанавливает обработчики для событий 'keydown', 'input' и 'paste' на элемент управления.
   */
  addEventListeners() {
    this.control.addEventListener('keydown', this.onPhoneKeyDownHandler);
    this.control.addEventListener('input', this.onPhoneInputHandler, false);
    this.control.addEventListener('paste', this.onPhonePasteHandler, false);
  }

  /**
   * Удаляет обработчики событий с поля ввода.
   * @description Снимает установленные события 'keydown', 'input' и 'paste' с элемента управления.
   */
  removeEventListeners() {
    this.control.removeEventListener('keydown', this.onPhoneKeyDownHandler);
    this.control.removeEventListener('input', this.onPhoneInputHandler, false);
    this.control.removeEventListener('paste', this.onPhonePasteHandler, false);
  }

  /**
   * Возвращает числовое значение из введенного текста.
   * @returns {string} Числовое значение, представляющее телефонный номер без нецифровых символов.
   */
  getInputNumbersValue() {
    return this.control.value.replace(/\D/g, '');
  }

  /**
   * Обработчик события вставки текста в поле ввода.
   * @description Проверяет содержимое буфера обмена и удаляет нецифровые символы из вставляемого текста.
   * @param {Event} event - Объект события вставки.
   */
  onPhonePaste(event) {
    const input = event.target;
    const inputNumbersValue = this.getInputNumbersValue();
    const pasted = event.clipboardData || window.clipboardData;
    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  }

  /**
   * Обработчик события ввода текста в поле ввода.
   * @description Форматирует введенные символы в телефонный номер в заданном формате.
   * @param {Event} event - Объект события ввода.
   */
  onPhoneInput(event) {
    const input = event.target;
    let inputNumbersValue = this.getInputNumbersValue();
    const { selectionStart } = input;
    let formattedInputValue = '';

    if (!inputNumbersValue) {
      input.value = '';
      return '';
    }

    if (input.value.length !== selectionStart) {
      if (event.data && /\D/g.test(event.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] === '9') inputNumbersValue = `7${inputNumbersValue}`;
      const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7';
      formattedInputValue = `${firstSymbols} `;
      input.value = `${firstSymbols} `;
      if (inputNumbersValue.length > 1) {
        formattedInputValue += `(${inputNumbersValue.substring(1, 4)}`;
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
      }
    } else {
      formattedInputValue = `+${inputNumbersValue.substring(0, 16)}`;
    }
    input.value = formattedInputValue;
  }

  /**
   * Обработчик события нажатия клавиши в поле ввода.
   * @description Удаляет содержимое поля, если осталась только одна цифра и нажата клавиша Backspace.
   * @param {Event} event - Объект события нажатия клавиши.
   */
  onPhoneKeyDown(event) {
    const inputValue = event.target.value.replace(/\D/g, '');
    if (event.keyCode === 8 && inputValue.length === 1) {
      event.target.value = '';
    }
  }

  /**
   * Устанавливает обработчики событий для методов класса.
   * @description Связывает контекст для обработчиков событий клавиатуры, ввода и вставки.
   */
  setEventsHandlers() {
    this.onPhoneKeyDownHandler = this.onPhoneKeyDown.bind(this);
    this.onPhoneInputHandler = this.onPhoneInput.bind(this);
    this.onPhonePasteHandler = this.onPhonePaste.bind(this);
  }

  /**
   * Уничтожает экземпляр PhoneMask и очищает все ресурсы.
   * @description Удаляет все обработчики событий и освобождает ссылку на элемент управления.
   */
  destroy() {
    this.removeEventListeners();
    this.control = null;
  }
}

/**
 * Инициализирует маски для ввода телефонных номеров на всех подходящих полях ввода.
 * @description Ищет поля ввода с атрибутами `data-phone-mask`, `type="tel"`, или `inputmode="tel"` и применяет к ним PhoneMask.
 */
export const initPhoneMasks = () => {
  [
    ...Array.from(document.querySelectorAll('input[data-phone-mask]')),
    ...Array.from(document.querySelectorAll('input[type="tel"]')),
    ...Array.from(document.querySelectorAll('input[inputmode="tel"]')),
  ].forEach(($input) => new PhoneMask({ control: $input }));
};
