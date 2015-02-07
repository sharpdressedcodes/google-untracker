self.port.on('load', function(){

    if (typeof untracker !== 'undefined')
        untracker.startObserving();

});

self.port.on('unload', function(){

    if (typeof untracker !== 'undefined')
        untracker.stopObserving();

});

var googleUntracker = function(){
    this.observer = null;
};

googleUntracker.prototype.startObserving = function(){

    var that = this;
    this.stopObserving();

    this.observer = new MutationObserver(function(mutations){

        for (var i = 0, i_ = mutations.length; i < i_; i++){
            var div = document.getElementById('search');
            if (mutations[i].type.toLowerCase() === 'childlist' && mutations[i].target === div)
                that.removeTracking(div);
        }

    });

    var config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    };

    this.observer.observe(document.body, config);

};

googleUntracker.prototype.stopObserving = function(){

    if (this.observer !== null){
        this.observer.disconnect();
        this.observer = null;
    }

};

googleUntracker.prototype.removeTracking = function(div){

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

};

var untracker = new googleUntracker();

untracker.startObserving();