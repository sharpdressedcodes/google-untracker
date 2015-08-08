'use strict';

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
                removeTracking(div.getElementsByTagName('a'));
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

var untracker = new googleUntracker();

untracker.startObserving();