/*
 These styles must be appended to the page's style:

 .transition-view-box {
 position: relative;
 }
 .transition-view-box .holder {
 position: absolute;
 top: 0; left: 0;
 }

 */

define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/views/transitionViewTransitions'
], function ($, _, Backbone, HandleBars
    , transitions
    ) {
    /*
        If you want to use or plan to use transitions when swapping views use
        this view.
        
    */
    return Backbone.View.extend({
        // Options
        destroyViewOnRemove: true,
        fadeDuration: 400,
        // Others
        className: 'transition-view-box',
        currentView: null,
        // Functions
        removeView: function() {
            this.setView(null);
        },
        setView: function(view) {
            if (this.currentView) {
                var previousView = this.transitionOutView(this.currentView);
            }
            this.currentView = view;
            if (view){
                this.transitionInView(view, previousView);
            }
            return view;
        },
        transitionOutView: function(view) {
            this.transitionOut(view);
            view.once('transitionout:finnished', function(view){
                this.removeView(view);
            }, this);
        },
        transitionOut: transitions.fadeOut,
        transitionInView: function(view, previousView) {
            // previousView will trigger "transitionout:finnished" when its out transition is finnished.
            this.addView(view);
            this.transitionIn(view, previousView);
        },
        transitionIn: transitions.fadeIn,
        removeView: function(view) {
            var $holder = this.getHolder(view);
            view.remove();
            $holder.remove();
            if (this.destroyViewOnRemove){
                if (_.isFunction(view.destroy)){
                    view.destroy();
                }
            }
            this.trigger('view:removed', view);
        },
        addView: function(view) {
            var $holder = this.createHolder();
            $holder.html(view.el);
            this.$el.append($holder);
            this.trigger('view:added', view);
        },
        createHolder: function() {
            return $('<div class="holder"></div>');
        },
        getHolder: function(view) {
            return view.$el.parent();
        }
    });
});