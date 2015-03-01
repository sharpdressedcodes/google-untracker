var div = document.getElementById("search");
var elements = [];

if (div)
    elements = div.getElementsByTagName("a");

if (elements.length > 0)
    removeTracking(elements);