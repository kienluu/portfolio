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
        initialize: function() {
            // This must be created here, otherwise all newly created instances
            // will share the same this.views!
            this.views = {};
        },
        // Functions
        removeView: function() {
            this.setView(null);
        },
        setView: function(view) {
            if (this.views[view.cid]) return view;
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
            delete this.views[view.cid];
            var $holder = this.getHolder(view);
            view.remove();
            $holder.remove();
            if (this.destroyViewOnRemove){
                if (_.isFunction(view.destroy)){
                    view.destroy();
                }
            }
            this.computeAndSetHeight();
            this.trigger('view:removed', view);
        },
        addView: function(view) {
            this.views[view.cid] = view;
            var $holder = this.createHolder();
            $holder.html(view.el);
            this.$el.append($holder);
            this.computeAndSetHeight();
            view.on('rendered', this.computeAndSetHeight, this);
            this.trigger('view:added', view);
        },
        createHolder: function() {
            return $('<div class="holder"></div>');
        },
        getHolder: function(view) {
            return view.$el.parent();
        },
        computeAndSetHeight: function() {
            // FIXME: If img heights are unknown then we need to run this command
            // once all images are loaded on the relavant view.
            // Currently I am making sure the image dimensions are known and set.
            var tallestView = _.max(this.views, function(view){
                // Might need to use hasOwnProperty here.
                return this.getHolder(view).outerHeight();
            }, this);
            var maxHeight = this.getHolder(tallestView).outerHeight();
            this.$el.css('height', maxHeight);
        }
    });
});