/*
 These styles must be appended to the page's style if you use transitions that
 will overlap at the same time.  You must set computeHeight to true as well:

 .transition-view-box {
 position: relative;
 }
 .transition-view-box .holder {
 position: absolute;
 top: 0; left: 0;
 }
 // Maybe these styles will not be needed in the transition where only one view can be seen at a time.  There should be a setting to turn off the height computations for such scenarios.

    The views passed to a TransitionView should trigger "rendered" for this to function properly

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
        duration: 400,
        computeHeight: false,
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
            if (view && this.views[view.cid]) return view;
            if (this.currentView) {
                var previousView = this.currentView;
                this.transitionOutView(previousView);
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
                // Call in a seperate thread so that other transitionout:finnished
                // event listeners gets a chance to run
                var self = this;
                // Hide view.$el so that removeView can still remove the viewHolder which just looks for $el's parent
                view.$el.hide();
                setTimeout(function(){
                    self.removeView(view);
                }, 1);
            }, this);
        },
        transitionOut: transitions.sFadeOut,
        transitionInView: function(view, previousView) {
            // previousView will trigger "transitionout:finnished" when its out transition is finnished.
            this.addView(view);
            this.transitionIn(view, previousView);
        },
        transitionIn: transitions.sFadeIn,
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
            // Test: load img with no dimension to check heights change correctly.
            //view.$el.append($('<img src="http://www.mamamia.com.au/wp-content/uploads/2011/07/mr-tall.jpg?q='+Math.random()+'">'));
            this.onRender(view);
            view.on('rendered', this.onRender, this);
            this.trigger('view:added', view);
        },
        createHolder: function() {
            return $('<div class="holder"></div>');
        },
        getHolder: function(view) {
            return view.$el.parent();
        },
        onRender: function(view) {
            // waitForImages does not seem to remove event listeners
            // http://stackoverflow.com/questions/6033821/do-i-need-to-remove-event-listeners
            var self = this;
            view.$el.waitForImages({
                each: function() {
                    self.computeAndSetHeight();
                }
            });
            this.computeAndSetHeight();
        },
        computeAndSetHeight: function() {
            if (!this.computeHeight) return;
            // FIXME: If img heights are unknown then we need to run this command
            // once all images are loaded on the relavant view.
            // Currently I am making sure the image dimensions are known and set.
            var tallestView = _.max(this.views, function(view){
                // Might need to use hasOwnProperty here.
                return this.getHolder(view).outerHeight();
            }, this);
            var maxHeight = tallestView === -Infinity? 0 : this.getHolder(tallestView).outerHeight();
            this.$el.css('height', maxHeight);
        }
    });
});