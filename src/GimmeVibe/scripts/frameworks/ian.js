/***********************************************
******** Iantech Javascript Framework **********
***********************************************/

var ian = ian || {};

//string formating accepting any param quantity
//usage: ian.format('Just use {0} in the {1}', 'placeholders', 'string');
ian.format = function (format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

ian.getCookie = function getCookie(name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(name + "=");
        if (c_start != -1) {
            c_start = c_start + name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

ian.setCookie = function (name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

ian.escapeRegex = function (str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

ian.replaceAll = function (find, replace, str) {
    return str.replace(new RegExp(ian.escapeRegex(find), 'g'), replace);
}

ian.combine = function (separator) {
    //combine
    var args = Array.prototype.slice.call(arguments, 1);
    var argArray = [];
    for (var i = 0; i < args.length; i++) {
        argArray.push(args[i]);
    }
    
    return argArray.join(separator);
}

ian.urlCombine = function () {
    var separator = '/';

    //fix arguments
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (arg.startsWith(separator)) {
            arg = arg.replace(separator, ''); //remove starting slash
        }
        if (arg.endsWith(separator)) {
            arg = arg.replace(new RegExp(separator + '$'), ''); //remove ending slash
        }
        arguments[i] = arg;
    }

    Array.prototype.unshift.call(arguments, separator);
    return ian.combine.apply(null, arguments);
}

ian.pathCombine = function () {
    var separator = '\\';

    //fix arguments
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (arg.startsWith(separator)) {
            arg = arg.replace(separator, ''); //remove starting slash
        }
        if (arg.endsWith(separator)) {
            arg = arg.replace(new RegExp(separator + '$'), ''); //remove ending slash
        }
        arguments[i] = arg;
    }

    Array.prototype.unshift.call(arguments, separator);
    return ian.combine.apply(null, arguments);
}

/*** Extensions ***/

//String.prototype.startsWith
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (searchString, position) {
            position = position || 0;
            return this.lastIndexOf(searchString, position) === position;
        }
    });
}

//String.prototype.startsWith
if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
        value: function (searchString, position) {
            var subjectString = this.toString();
            if (position === undefined || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        }
    });
}
