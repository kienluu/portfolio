define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, HandleBars) {
    //TODO: Add css animation


    // Synchronous animations
    var sFadeOut = function(view) {
        // Note: jquery animations will override the current animation.
        // So as a note to myself to becareful if I use another tween library.
        // This is especially true If the in transitions are delayed.
        view.$el.fadeOut(this.duration, function(){
            view.trigger('transitionout:finnished', view);
        });
    }
    var sFadeIn = function(view, previousView) {
        // previousView will be null if there are no previous views.
        view.$el.hide().fadeIn(this.duration, function(){
            view.trigger('transitionin:finnished', view);
        });
    }

    // Non synchronous animations
    var createTransitionOutFunc = function(param1) {
        if (_.isFunction(param1)){
            var transitionFunction = param1;
        }
        else {
            transitionFunction = $.fn.animate;
            var animateProperties = param1;
        }
        return function(view) {
            var self = this;
            // The 3 cases are: transitioning out, transitioning in, none
            // If something is already sliding up then do nothig.
            if (!self.$transitionOutBox) {
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
                var options = {
                    duration: duration,
                    complete: function(){
                        self.$transitionOutBox = null;
                        view.trigger('transitionout:finnished', view);
                        self.transitionIn(self.waitingInView);
                        self.waitingInView = null;
                    }
                };
                var argumentList = [];
                if (animateProperties){
                    argumentList.push(animateProperties);
                }
                argumentList.push(options);
                transitionFunction.apply($holder, argumentList);
            }

        }
    }

    var createTransitionInFunc = function(param1) {
        if (_.isFunction(param1)){
            var transitionFunction = param1;
        }
        else {
            transitionFunction = $.fn.animate;
            var animateProperties = param1;
        }
        return function(view, previousView) {
            var self = this;
            var $holder = self.getHolder(view);
            $holder.hide();
            if (!self.$transitionOutBox){
                self.$transitionInBox = $holder;
                var options = {
                    duration: self.duration,
                    complete: function(){
                        self.$transitionInBox = null;
                        view.trigger('transitionin:finnished', view);
                    }
                };
                var argumentList = [];
                if (animateProperties){
                    argumentList.push(animateProperties);
                }
                argumentList.push(options);
                transitionFunction.apply($holder, argumentList);
            }
            else{
                if (self.waitingInView) self.removeView(self.waitingInView);
                self.waitingInView = view;
            }
        }
    }

    var slideUp = createTransitionOutFunc($.fn.slideUp);
    var slideDown = createTransitionInFunc($.fn.slideDown);
    var fadeOut = createTransitionOutFunc($.fn.fadeOut);
    var fadeIn = createTransitionInFunc($.fn.fadeIn);

    return {
        sFadeOut: sFadeOut,
        sFadeIn: sFadeIn,
        /* Non synchronous transitions.
         This time of transition work like this:

         - When adding a new view if a view is present then it will transition out.
         Then the new transition will come in after this has finnished.
         - If when a new view is present like above but it is transitioning in.
         then that transition will stop and in its state at that time it will begin to
         transition out instead.
         - If any new view get added added during this transitioning out it will be the new
         view that gets transitioned in and the view that never had a chance to
         transition in will be removed from the queue.
         */
        fadeOut: fadeOut,
        fadeIn: fadeIn,
        slideUp: slideUp,
        slideDown: slideDown
    }
});