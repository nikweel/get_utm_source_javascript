class Utm_helper {
  constructor() {
    this.url_search_param = [
      'referrer',
      'utm_content',
      'utm_medium',
      'utm_campaign',
      'utm_source',
      'utm_term',
      'utm_referrer',
      '_ga',
      '_ym_uid',
    ];
    this.all_utm = {};
    this.init();
  }

  init() {
    const self = this;
    
    self.url_search_param.forEach(function(item) {
      const get_param = self.getParams(item);
      const get_cookie = self.readCookie(item);
      
      if (get_param) {
        if (get_param !== get_cookie) {
          document.cookie = `${item}=${encodeURIComponent(get_param)}; max-age=31536000; path=/`;
        }
      }
      
      if (get_param || get_cookie) {
        self.all_utm[item] = get_param || get_cookie;
      }
    });
    
    self.start();
  }

  getParams(param) {
    if (param === 'referrer') {
      return document.referrer || '';
    }
    
    try {
      const urlParams = new URL(window.location.toString()).searchParams;
      const value = urlParams.get(param);
      return value || '';
    } catch (e) {
      console.error('Error parsing URL:', e);
      return '';
    }
  }

  readCookie(name) {
    const name_cook = name + "=";
    const spl = document.cookie.split(";");
    
    for (let i = 0; i < spl.length; i++) {
      let c = spl[i].trim();
      if (c.indexOf(name_cook) === 0) {
        return decodeURIComponent(c.substring(name_cook.length, c.length));
      }
    }
    return '';
  }

  start() {
    const self = this;
    
    // Функция для добавления UTM полей в формы
    const addUtmFields = function() {
      const list_form = document.forms;
      
      for (let i = 0; i < list_form.length; i++) {
        for (const key in self.all_utm) {
          if (self.all_utm.hasOwnProperty(key) && self.all_utm[key]) {
            const existingInputs = list_form[i].querySelectorAll(`[name="${key}"]`);
            if (!existingInputs.length) {
              const input = document.createElement('input');
              input.type = 'hidden';
              input.className = 'utm_info';
              input.name = key;
              input.value = self.all_utm[key];
              list_form[i].appendChild(input);
            }
          }
        }
      }
    };
    
    // Функция для обновления значений UTM полей
    const updateUtmFields = function() {
      const input_utm = document.querySelectorAll('input.utm_info');
      
      for (let i = 0; i < input_utm.length; i++) {
        const fieldName = input_utm[i].name;
        if ((!input_utm[i].value || input_utm[i].value === '') && self.all_utm[fieldName]) {
          input_utm[i].value = self.all_utm[fieldName];
        }
      }
    };
    
    // Запускаем сразу
    addUtmFields();
    updateUtmFields();
    
    // Периодически проверяем (реже, чем в оригинале)
    setInterval(addUtmFields, 500);
    setInterval(updateUtmFields, 500);
    
    // Также добавляем обработчик для динамически добавляемых форм
    const observer = new MutationObserver(function(mutations) {
      let shouldCheck = false;
      
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === 1 && (node.tagName === 'FORM' || node.querySelector('form'))) {
              shouldCheck = true;
              break;
            }
          }
        }
        if (shouldCheck) break;
      }
      
      if (shouldCheck) {
        setTimeout(addUtmFields, 100);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Инициализация
let utm_helper = new Utm_helper();