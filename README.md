# CRM
# REST API для базы данных клиентов

Перед запуском убедитесь, что вы установили Node.js версии 12 или выше.

Для запуска сервера перейдите в папку с репозиторием и выполните команду `node index`. Для остановки нажмите сочетание клавиш CTRL+C.

После запуска сервера API будет доступен по пути `http://localhost:3000`.

## Методы API

Все методы API, требующие тела запроса, ожидают получить тело в виде JSON. Ответы всех методов также отдаются в виде JSON.

* `GET /api/clients` получить список клиентов. Параметры, передаваемые в URL:
    * `search={search string}` поисковый запрос, при передаче метод вернёт клиентов, у которых имя, фамилия, отчество или значение одного из контактов содержат указанную подстроку
* `POST /api/clients` создать нового клиента. В теле запроса нужно передать объект клиента. Тело ответа успешно обработанного запроса будет содержать объект с созданным клиентом.
* `GET /api/client/{id}` получить данные клиента по его ID. Тело ответа успешно обработанного запроса будет содержать объект клиента.
* `PATCH /api/client/{id}` перезаписать данные о клиенте с переданным ID. Тело ответа успешно обработанного запроса будет содержать объект с обновлённым клиентом.
* `DELETE /api/client/{id}` удалить клиента с переданному ID.

## Структура объекта клиента

```javascript
{
  // ID клиента, заполняется сервером автоматически, после создания нельзя изменить
  id: '1234567890',
  // дата и время создания клиента, заполняется сервером автоматически, после создания нельзя изменить
  createdAt: '2021-02-03T13:07:29.554Z',
  // дата и время изменения клиента, заполняется сервером автоматически при изменении клиента
  updatedAt: '2021-02-03T13:07:29.554Z',
  // * обязательное поле, имя клиента
  name: 'Василий',
  // * обязательное поле, фамилия клиента
  surname: 'Пупкин',
  // необязательное поле, отчество клиента
  lastName: 'Васильевич',
  // контакты - необязательное поле, массив контактов
  // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
  contacts: [
    {
      type: 'Телефон',
      value: '+71234567890'
    },
    {
      type: 'Email',
      value: 'abc@xyz.com'
    },
    {
      type: 'Facebook',
      value: 'https://facebook.com/vasiliy-pupkin-the-best'
    }
  ]
}
```

## Возможные статусы ответов

Ответ сервера может содержать один из статусов ответа:
* `200` - запрос обработан нормально
* `201` - запрос на создание нового элемента успешно обработан, а заголовок ответа Location содержит ссылку на GET метод получения созданного элемента
* `404` - переданный в запросе метод не существует или запрашиваемый элемент не найден в базе данных
* `422` - объект, переданный в теле запроса, не прошёл валидацию. Тело ответа содержит массив с описаниями ошибок валидации:
  ```javascript
  [
    {
      field: 'Название поля объекта, в котором произошла ошибка',
      message: 'Сообщение об ошибке, которое можно показать пользователю'
    }
  ]
  ```
* `500` - странно, но сервер сломался :(<br>Обратитесь к куратору Skillbox, чтобы решить проблему
