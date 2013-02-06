define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, HandleBars) {
    var fadeOut = function(view) {
        // Note: jquery animations will override the current animation.
        // So as a note to myself to becareful if I use another tween library.
        // This is especially true If the in transitions are delayed.
        view.$el.fadeOut(this.fadeDuration, function(){
            view.trigger('transitionout:finnished', view);
        });
    }
    var fadeIn = function(view, previousView) {
        // previousView will be null if there are no previous views.
        view.$el.hide().fadeIn(this.fadeDuration, function(){
            view.trigger('transitionin:finnished', view);
        });
    }
    return {
        fadeOut: fadeOut,
        fadeIn: fadeIn
    }
});