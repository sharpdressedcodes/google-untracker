'use strict';

const regex = /http(s)?.*google\.com.*/i;
const removeFunctionFileName = 'google-untracker-remove-tracking.js';

var pageMod = require('sdk/page-mod');
var self = require('sdk/self');
var tabs = require('sdk/tabs');
var worker = null;

exports.onUnload = function(reason){

    //switch (reason){
        //case 'uninstall':
        //case 'disable':
        //case 'shutdown':
        //case 'upgrade':
        //case 'downgrade':
            if (worker !== null){
                worker.port.emit('unload');
            }
            //break;
    //}

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