'use strict';

var removeTracking = function(elements){

    var attr = 'onmousedown';
    var search = '&url=';
    var len = search.length;
    var debug = false;
    var count = 0;
    var removed = [];

    for (var i = 0, i_ = elements.length; i < i_; i++){

        if (elements[i].hasAttribute(attr) && elements[i].getAttribute(attr).indexOf('return rwt(this,') > -1){

            if (debug) {
                removed.push(elements[i]);
                count++;
            }

            var s = elements[i].getAttribute('href');
            var pos = s.indexOf(search);
            var pos2 = s.indexOf('&ei=', pos);

            elements[i].removeAttribute(attr);

            if (pos > -1 && pos2 > -1)
                elements[i].setAttribute(decodeURIComponent(s.substr(pos + len, pos2 - pos - len)));

        }

    }

    if (debug)
        console.log('Google Untracker: (' + count + ') ', removed);

};