define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, HandleBars) {
    /*
        This function will take a container as its parameter then find all its
        uncached images and replace them with a loader image until the image is
        loaded.
    */
    return function ($el, loaderImgTpl, loaderImgCss) {
        // $.waitForImages adds an extra :uncached selector to find uncached images
        if (!loaderImgTpl) {
            loaderImgTpl = '<img src="images/ajax-loader.gif">';
        }
        var $images = $el.find('img:uncached');
        $images.each(function(index, element){
            var $image = $(element);
            var $loader = $(loaderImgTpl);
            $loader.addClass('simple-loader-img');
            if (loaderImgCss) {
                $loader.css(loaderImgCss);
            }
            $image.hide();
            $image.after($loader);
        });
        $images.one('load', function() {
            var $image = $(this);
            var $loader = $image.next('.simple-loader-img');
            $loader.remove();
            $image.show();
        });

    }
});