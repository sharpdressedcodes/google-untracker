var worker = null;
var pageMod = require('sdk/page-mod');
var self = require('sdk/self');
var tabs = require('sdk/tabs');
var regex = /https.*google\.com.*/;
var removeFunctionFileName = 'google-untracker-remove-tracking.js';

exports.onUnload = function(reason){

    switch (reason){
        case 'uninstall':
        case 'disable':
        //case 'shutdown':
        //case 'upgrade':
        //case 'downgrade':
            if (worker !== null)
                worker.port.emit('unload');
            break;
    }

};

pageMod.PageMod({
    include: regex,
    contentScriptFile: [
        self.data.url(removeFunctionFileName),
        self.data.url('google-untracker.js')
    ],
    onAttach: function(w) {
        worker = w;
    }
});

tabs.on('ready', function(tab){
    if (regex.test(tab.url)){
        var worker = tab.attach({
            contentScriptFile: [
                self.data.url(removeFunctionFileName),
                self.data.url('google-untracker-load.js')
            ],
            contentScriptWhen: 'end'
        });
    }
});