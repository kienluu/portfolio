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
        isSelected: false,
        tagName: 'li',
        className: 'top-nav-item',
        events:{
            "click": "onClick"
        },
        initialize: function(options) {
            assert.ok(options.group);

            this.group = options.group;
            this.$_template = HandleBars.compile(topNavItemTpl);
            this.group.on("change", this.render)
            this.render();
        },
        render: function() {
            this.$el.html(this.$_template(this.group.toJSON()));
        },
        onClick: function(me) {
            if (this.isSelected) return;
            this.isSelected = true;
            this.trigger('selected', [this]);
        }
    });
    return TopNavItemView;
});