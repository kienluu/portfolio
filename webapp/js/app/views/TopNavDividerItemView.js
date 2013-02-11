
define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
    // Templates
    // App
], function ($, _, Backbone, HandleBars
    ) {
    return Backbone.View.extend({
        tagName: 'li',
        className: 'divider',
        initialize: function(options) {
            this.model = options.model;
            var appendClass = this.model.get('appendClass');
            if (appendClass) {
                this.$el.addClass(appendClass);
            }
            this.render();
        },
        render: function() {
        },
        getModel: function() {
            return this.model;
        },
        destroy: function () {
            // TODO: Implementation
        }
    });
});