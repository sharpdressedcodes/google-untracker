(function(){

    var observer = null;

    function observeEvents(){

        observer = new MutationObserver(function(mutations){

            for (var i = 0, i_ = mutations.length; i < i_; i++){
                var div = document.getElementById('search');
                if (mutations[i].type.toLowerCase() === 'childlist' && mutations[i].target === div)
                    removeTracking(div);
            }

        });

        var config = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        };

        observer.observe(document.body, config);

    }

    function removeTracking(div){

        var attr = 'onmousedown';
        var search = '&url=';
        var len = search.length;
        var elements = div.getElementsByTagName('a');

        for (var i = 0, i_ = elements.length; i < i_; i++){

            if (elements[i].hasAttribute(attr) && elements[i].getAttribute(attr).indexOf('return rwt(this,') > -1){

                var s = elements[i].getAttribute('href');
                var pos = s.indexOf(search);
                var pos2 = s.indexOf('&ei=', pos);

                elements[i].removeAttribute(attr);

                if (pos > -1 && pos2 > -1)
                    elements[i].setAttribute(decodeURIComponent(s.substr(pos + len, pos2 - pos - len)));

            }

        }

    }

    observeEvents();

})();