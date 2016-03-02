importScript('stackblur/dist/stackblur.min.js')
importScript('tinycolor/dist/tinycolor-min.js');

self.addEventListener('message', function(event) {
    var imageData = event.data.imageData;
    var options = event.data.options;

    StackBlur.imageDataRGB(imageData, 0, 0, imageData.width, imageData.height, options.blurRadius);

    var data = imageData.data;
    if (options.lighten || options.brighten) {
        for (var i = 0; i < data.length; i += 4) {
            var color = tinycolor({
                r: data[i],
                g: data[i + 1],
                b: data[i + 2]
            });
 
            if (options.lighten) color.lighten(options.lighten);
            if (options.darken) color.darken(options.darken);

            var rgb = color.toRgb();
            data[i] = rgb.r;
            data[i + 1] = rgb.g;
            data[i + 2] = rgb.b;
        }    
    }

    self.postMessagge(imageData, [imageData.data.buffer]);
});