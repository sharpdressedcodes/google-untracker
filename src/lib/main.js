var pageMod = require('sdk/page-mod');
var self = require('sdk/self');

pageMod.PageMod({
    include: /https.*google\.com.*/,
    contentScriptFile: self.data.url('google-untracker.js')
});