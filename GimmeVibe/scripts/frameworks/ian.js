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
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

ian.combine = function (separator) {
    //combine
    var combined = '';
    var args = arguments.slice(1);
    for (var i = 0; i < args.length; i++) {
        combined += args[i];
    }

    //fix duplicates
    if (separator !== undefined) {
        combined = ian.replaceAll((separator + separator), separator, combined);
    }

    return combined;
}

ian.urlCombine = function () {
    var args = arguments.unshift('/');
    ian.combine.apply(this, args);
}

ian.pathCombine = function () {
    var args = arguments.unshift('\\');
    ian.combine.apply(this, args);
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
