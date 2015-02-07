var worker = null;
var pageMod = require('sdk/page-mod');
var self = require('sdk/self');

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
    include: /https.*google\.com.*/,
    contentScriptFile: self.data.url('google-untracker.js'),
    onAttach: function(w) {
        worker = w;
    }
});