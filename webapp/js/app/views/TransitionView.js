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
    'handlebars'
    // Template
], function ($, _, Backbone, HandleBars
    ) {
    /*
        If you want to use or plan to use transitions when swapping views use
        this view.
        
    */
    return Backbone.View.extend({
        // Options
        destroyViewOnRemove: true,
        // Others
        className: 'transition-view-box',
        currentView: null,
        // Functions
        setView: function(view) {
            var previousView = this.transitionOutView(this.currentView);
            this.currentView = view;
            this.transitionInView(view, previousView);
            return view;
        },
        transitionOutView: function(view) {
            if (!view) return null;
            this.transitionOut(view);
            view.once('transitionout:finnished', function(view){
                this.removeView(view);
            }, this);
        },
        transitionOut: function(view) {
            // Note: jquery animations will override the current animation.
            // So as a note to myself to becareful if I use another tween library.
            // This is especially true If the in transitions are delayed.
            view.$el.fadeOut('slow', function(){
                view.trigger('transitionout:finnished', view);
            });
        },
        transitionInView: function(view, previousView) {
            // previousView will trigger "transitionout:finnished" when its out transition is finnished.
            this.addView(view);
            this.transitionIn(view, previousView);
        },
        transitionIn: function(view, previousView) {
            // previousView will be null if there are no previous views.
            view.$el.fadeIn('slow', function(){
                view.trigger('transitionin:finnished', view);
            });
        },
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