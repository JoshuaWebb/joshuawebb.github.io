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

document.addEventListener("DOMContentLoaded", function(event) {
    DOMContentLoaded();
});

function DOMContentLoaded() {
    initColor();
}
