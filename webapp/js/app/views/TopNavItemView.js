define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates
    'text!app/templates/TopNavItemTpl.hbs',
    // App
    'app/models/GroupModel'
], function ($, _, Backbone, HandleBars
    , topNavItemTpl
    , GroupModel
    ) {
    var TopNavItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'top-nav-item',
        initialize: function(options) {
            assert.ok(options.group);

            this.group = options.group;
            this.$_template = HandleBars.compile(topNavItemTpl);
            this.group.on("change", this.render)
            this.render();
        },
        render: function() {
            this.$el.html(this.$_template(this.group.toJSON()));
        }
    });
    return TopNavItemView;
});