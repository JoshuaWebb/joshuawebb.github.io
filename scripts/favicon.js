// http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
// HSV values in [0, 1]
// returns {r, g, b} values from [0 to 255]
function hsv_to_rgb(h, s, v) {
    var h_i = ~~(h * 6);
    var f = h * 6 - h_i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    var r, g, b;
    r = g = b = 0;
    if (h_i == 0) { r = v; g = t; b = p; } // [r, g, b] = [v, t, p];
    if (h_i == 1) { r = q; g = v; b = p; } // [r, g, b] = [q, v, p];
    if (h_i == 2) { r = p; g = v; b = t; } // [r, g, b] = [p, v, t];
    if (h_i == 3) { r = p; g = q; b = v; } // [r, g, b] = [p, q, v];
    if (h_i == 4) { r = t; g = p; b = v; } // [r, g, b] = [t, p, v];
    if (h_i == 5) { r = v; g = p; b = q; } // [r, g, b] = [v, p, q];

    return {
        r: ~~(r * 256),
        g: ~~(g * 256),
        b: ~~(b * 256)
    };
}

function generate_random_color() {
    // use golden ratio to try distribute more evenly
    var golden_ratio_conjugate = 0.618033988749895;
    var h = Math.random(); // use random start value
    h += golden_ratio_conjugate;
    h %= 1;

    var s = Math.random() * 0.3 + 0.4; // [0.4, 0.7]
    var v = Math.random() * 0.2 + 0.8; // [0.8, 1]

    return hsv_to_rgb(h, s, v);
}

function replaceColor(ctx, oldColor, newColor) {
    var map = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    var bytes = map.data;

    // pixel = r, g, b, a
    for (var pixel = 0; pixel < bytes.length; pixel += 4) {
        if (bytes[pixel    ] != oldColor.r ||
            bytes[pixel + 1] != oldColor.g ||
            bytes[pixel + 2] != oldColor.b)
            continue;

        bytes[pixel    ] = newColor.r;
        bytes[pixel + 1] = newColor.g;
        bytes[pixel + 2] = newColor.b;
    }

    ctx.putImageData(map, 0, 0);
}

function randomizeFaviconColor(callback) {
    var dimension = 32;
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = dimension;

    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = '/favicon.ico';

    img.onload = function () {
        var oldColor = { r: 255, g: 255, b: 255 };
        var newColor = generate_random_color();

        ctx.drawImage(img, 0, 0, dimension, dimension);
        replaceColor(ctx, oldColor, newColor);

        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel  = 'shortcut icon';
        link.href = canvas.toDataURL('image/x-icon');
        document.getElementsByTagName('head')[0].appendChild(link);
        callback(newColor);
    }
}
