function initColor() {
    randomizeFaviconColor(function(newColor) {
        var styleEl = document.createElement('style'), styleSheet;
        // Append style element to head
        document.head.appendChild(styleEl);

        // Grab style sheet
        styleSheet = styleEl.sheet;

        var newColorStr = 'rgb(' + newColor.r +',' + newColor.g +',' + newColor.b + ');';
        var newRule = '.left { border-color:' + newColorStr + ' }';
        styleSheet.insertRule(newRule, styleSheet.cssRules.length );
    });
}

// http://stackoverflow.com/a/14388512
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function DOMContentLoaded() {
    initColor();
    fetchJSONFile('data/links.json', function(data){
        var list = document.getElementById("links");
        var loaded = 0;
        var numLinks = data.length;

        // Wait for all images to load before animating
        function imageLoaded() {
            loaded++;
            if (loaded == numLinks) {
                list.className += " loaded";
            }
        }

        data.forEach(function(item, index) {
            // Load the icon as an Image so we can get a callback
            // (even if it is loaded from cache)
            var image = new Image();
            image.onload = imageLoaded;
            image.src = item.iconUrl;

            var newItem = document.createElement('li');
            var newLink = document.createElement('a');
            newLink.title = item.title;
            newLink.style.backgroundImage = 'url(' + item.iconUrl + ')';
            newLink.href = item.linkUrl;
            newLink.style["-webkit-animation-delay"] = index * 0.1 + 's';

            newItem.appendChild(newLink);
            list.appendChild(newItem);
        });
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    DOMContentLoaded();
});
