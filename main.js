(function() {
    
    /**
     * support: https://vk.com/nikweel
    */

    var url_seach_param = [
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

    var all_utm  = {};

    function getParams(param) {
        if(param == 'referrer'){
            return document.referrer;
        }
        const urlParams = new URL(window.location.toString()).searchParams
        return urlParams.get(param) || false;
    }

    function readCookie(name) {
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

    url_seach_param.forEach(function(item, index, array) {
        var get_param = getParams(item);
        var get_cookie =  readCookie(item);
        if(get_param){
            if(get_param != get_cookie){
                document.cookie = `${item}=${get_param}; max-age=31536000; path=/`; // пишем метку в куку что бы она не терялась на сайте
            }
        }
        if(get_param || get_cookie){
            all_utm[item] = get_param || get_cookie;
        }   
    });

    setInterval(function() {
        var list_form = document.forms;
        for (var i = 0; i < list_form.length; i++) {
            for (var key in all_utm) {
                if(!list_form[i].querySelectorAll(`[name="${key}"]`)[0]){
                    var input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'nikweel_class';
                    input.style = 'display:none';
                    input.name = key;
                    input.value = all_utm[key];
                    list_form[i].appendChild(input);
                }
            }
        }
    }, 100);

    setInterval(function() {
        var input_utm = document.querySelectorAll('input.nikweel_class');
        for (var i = 0; i < input_utm.length; i++) {
            if(input_utm[i].value == ''){
                input_utm[i].value = all_utm[input_utm[i].name]
            }
        }
    }, 100);

})();
