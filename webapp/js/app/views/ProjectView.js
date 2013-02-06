define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, HandleBars) {
    return Backbone.View.extend({
        tagName: 'article',
        className: 'project-content-box',
        render: function() {
            this.$el.html(this.project.get('content'));
        },
        initialize: function(options) {
            this.project = options.project;
            this.render();
        },
        destroy: function () {
            this.project.off(null, null, this);
            this.off();
            this.remove();
        }
    });
});