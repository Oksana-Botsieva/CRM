import { errors } from '../constants/errors';

/**
 * Класс для валидации элементов формы.
 * Включает методы для проверки обязательных полей, номеров телефонов и email-адресов.
 */
export class Validation {
  /**
   * Массив валидаторов.
   * Каждый валидатор включает условие и код ошибки, который должен быть показан при ошибке.
   * @type {Array<{condition: Function, errorCode: string}>}
   */
  validators = [
    {
      condition: (control) => !this.requiredControlValidation(control),
      errorCode: 'er001',
    },
    {
      condition: (control) =>
        control.value &&
        (control.type === 'tel' || control.inputMode === 'tel') &&
        !this.phoneNumberControlValidation(control),
      errorCode: 'er002',
    },
    {
      condition: (control) =>
        control.value &&
        (control.type === 'email' || control.inputMode === 'email') &&
        !this.emailControlValidation(control),
      errorCode: 'er003',
    },
  ];

  /**
   * Метод для валидации массива элементов формы.
   * Проверяет каждый элемент формы на соответствие условиям валидаторов.
   * @param {Array} controls Массив элементов формы для валидации.
   * @returns {boolean} Возвращает true, если все элементы валидны, иначе false.
   */
  validate(controls) {
    let isValid = true;

    for (let $control of controls) {
      for (let validator of this.validators) {
        if (validator.condition($control)) {
          this.showError(validator.errorCode, $control);
          isValid = false;
          break;
        }
      }
    }

    return isValid;
  }

  /**
   * Проверка обязательного поля.
   * @param {HTMLInputElement} $control Элемент формы для проверки.
   * @returns {boolean} Возвращает true, если поле не обязательно или заполнено.
   */
  requiredControlValidation($control) {
    if (!$control.required) return true;
    return !!$control.value.trim();
  }

  /**
   * Проверка номера телефона.
   * @param {HTMLInputElement} $control Элемент формы для проверки.
   * @returns {boolean} Возвращает true, если номер телефона валиден.
   */
  phoneNumberControlValidation($control) {
    return /^(?:\+\d{11}|\d{11})$/.test($control.value.replace(/[^\d+]/g, ''));
  }

  /**
   * Проверка email адреса.
   * @param {HTMLInputElement} $control Элемент формы для проверки.
   * @returns {boolean} Возвращает true, если email валиден.
   */
  emailControlValidation($control) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($control.value);
  }

  /**
   * Показать ошибку для элемента формы.
   * @param {string|null} errorCode Код ошибки для отображения.
   * @param {HTMLInputElement} input Элемент формы, для которого отображается ошибка.
   * @param {string|null} errorText Текст ошибки, если errorCode не задан.
   */
  showError(errorCode = null, input, errorText = null) {
    const control = input.closest('div');
    const $error = control.querySelector('p');

    if ($error) {
      $error.innerText = errorCode
        ? errors[errorCode](
            control.querySelector('label span')?.textContent || control.querySelector('label')?.textContent,
          )
        : errorText;
    }
    control.classList.add('control_with-error');
  }

  /**
   * Скрыть все ошибки для элементов формы.
   * @param {Array} controls Массив элементов формы для очистки ошибок.
   */
  hideErrors(controls) {
    controls.forEach((input) => {
      const control = input.closest('div');
      const $error = control.querySelector('p');

      control.classList.remove('control_with-error');
      if ($error) {
        $error.innerText = '';
      }
    });
  }
}
