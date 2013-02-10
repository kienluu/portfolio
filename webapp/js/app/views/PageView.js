define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, HandleBars) {
    return Backbone.View.extend({
        tagName: 'article',
        className: 'page-content-box',
        render: function() {
            this.$el.html(this.page.get('content'));
            this.trigger('rendered', this);
        },
        initialize: function(options) {
            this.page = options.page;
            this.render();
        },
        destroy: function () {
            this.page.off(null, null, this);
            this.off();
            this.remove();
        }
    });
});