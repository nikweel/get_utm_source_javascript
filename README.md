# UTM Helper

[English](#english) | [Русский](#russians)

---

## <a name="english"></a>English

`UTM Helper` is a JavaScript class for working with UTM parameters and referrers. It automatically saves parameters from the URL and cookies, adds them to forms on the page, and updates values when necessary.

### Features

- Extract UTM parameters and referrer from the URL.
- Save UTM parameters in cookies with a long expiration time.
- Automatically add hidden fields with UTM parameters to forms on the page.
- Update UTM parameter values in forms.
- Handle dynamically added forms using `MutationObserver`.

### Usage

1. Include the `main.js` script on your page.
2. Initialization happens automatically when you create an instance of the `Utm_helper` class.


Example:
```html
<script src="main.js"></script>
<script>
  let utm_helper = new Utm_helper();
</script>
```



---

## <a name="russians"></a>Русский

`UTM Helper` — это JavaScript-класс для работы с UTM-метками и реферерами. Он автоматически сохраняет параметры из URL и cookies, добавляет их в формы на странице и обновляет значения при необходимости.

### Функциональность

- Извлечение UTM-меток и реферера из URL.
- Сохранение UTM-меток в cookies с длительным сроком действия.
- Автоматическое добавление скрытых полей с UTM-метками в формы на странице.
- Обновление значений UTM-меток в формах.
- Обработка динамически добавляемых форм с помощью `MutationObserver`.

### Использование

1. Подключите скрипт `main.js` на вашу страницу.
2. Инициализация происходит автоматически при создании экземпляра класса `Utm_helper`.

Пример:
```html
<script src="main.js"></script>
<script>
  let utm_helper = new Utm_helper();
</script>
