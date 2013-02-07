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
        view.$el.fadeOut(this.duration, function(){
            view.trigger('transitionout:finnished', view);
        });
    }
    var fadeIn = function(view, previousView) {
        // previousView will be null if there are no previous views.
        view.$el.hide().fadeIn(this.duration, function(){
            view.trigger('transitionin:finnished', view);
        });
    }

    // Non synchronous animations
    
    var slideUp = function(view) {
        var self = this;
        // The 3 cases are: transitioning out, transitioning in, none
        if (!!self.$transitionOutBox){
            // If something is already sliding up ignore this
        }
        else {
            var $holder = self.getHolder(view);
            self.$transitionOutBox = $holder;
            var duration = self.duration
            if (self.$transitionInBox) {
                // slide stop the current animating in animation and slide out with
                // the a shortened duration
                $holder.stop(true);
                self.$transitionInBox = null;
                duration = duration * 0.5;
            }

            $holder.slideUp({
                duration: duration,
                complete: function(){
                    self.$transitionOutBox = null;
                    view.trigger('transitionout:finnished', view);
                    debugger;
                    self.transitionIn(self.waitingInView);
                    self.waitingInView = null;
                }
            });
        }

    }
    var slideDown = function(view, previousView) {
        var self = this;
        var $holder = self.getHolder(view);
        $holder.hide();
        if (!self.$transitionOutBox){

            self.$transitionInBox = $holder;
            $holder.slideDown({
                duration: self.duration,
                complete: function(){
                    self.$transitionInBox = null;
                    view.trigger('transitionin:finnished', view);
                }
            });
        }
        else{
            if (self.waitingInView) self.removeView(self.waitingInView);
            self.waitingInView = view;
        }
    }
    return {
        fadeOut: fadeOut,
        fadeIn: fadeIn,
        slideUp: slideUp,
        slideDown: slideDown
    }
});