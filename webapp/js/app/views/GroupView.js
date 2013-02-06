define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, HandleBars) {
    return Backbone.View.extend({
        tagName: 'article',
        className: 'group-description-box',
        render: function() {
            this.$el.html(this.group.get('description'));
        },
        initialize: function(options) {
            this.group = options.group;
            this.render();
        },
        destroy: function () {
            this.group.off(null, null, this);
            this.off();
            this.remove();
        }
    });
});