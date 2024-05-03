class Utm_helper {

  url_seach_param = [
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
  all_utm  = {};

  constructor() {
    self = this;
    self.url_seach_param.forEach(function(item, index, array) {
      var get_param = self.getParams(item);
      var get_cookie =  self.readCookie(item);
      if(get_param){
          if(get_param != get_cookie){
              document.cookie = `${item}=${get_param}; max-age=31536000; path=/`; // пишем метку в куку что бы она не терялась на сайте
          }
      }
      if(get_param || get_cookie){
        self.all_utm[item] = get_param || get_cookie;
      }   
    });
    self.start();
  }

  getParams = function(param) {
    self = this;
    if(param == 'referrer'){
        return document.referrer;
    }
    const urlParams = new URL(window.location.toString()).searchParams
    return urlParams.get(param) || false;
  }

  readCookie = function(name) {
    self = this;
    var name_cook = name+"=";
    var spl = document.cookie.split(";");
    for(var i=0; i<spl.length; i++) {
        var c = spl[i];
        while(c.charAt(0) == " ") {
            c = c.substring(1, c.length);
        }
        if(c.indexOf(name_cook) == 0) {
            return c.substring(name_cook.length, c.length);
        }
    }
    return false;
  }

  start = function() {
    setInterval(function() {
      var list_form = document.forms;
      for (var i = 0; i < list_form.length; i++) {
          for (var key in self.all_utm) {
              if(!list_form[i].querySelectorAll(`[name="${key}"]`)[0]){
                  var input = document.createElement('input');
                  input.type = 'text';
                  input.className = 'utm_info';
                  input.style = 'display:none';
                  input.name = key;
                  input.value = self.all_utm[key];
                  list_form[i].appendChild(input);
              }
          }
      }
    }, 100);

    setInterval(function() {
      var input_utm = document.querySelectorAll('input.utm_info');
      for (var i = 0; i < input_utm.length; i++) {
          if(input_utm[i].value == ''){
              input_utm[i].value = self.all_utm[input_utm[i].name]
          }
      }
    }, 100);
  }
}

let utm_helper = new Utm_helper();
