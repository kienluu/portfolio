define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates
    'text!app/templates/TopNavItemTpl.hbs',
    // App
//    'app/models/GroupModel',
    'app/views/SelectableItemMixin'
], function ($, _, Backbone, HandleBars
    , topNavItemTpl
//    , GroupModel
    , SelectableItemMixin
    ) {
    var TopNavItemView = Backbone.View.extendWithMixin([SelectableItemMixin], {
        tagName: 'li',
        className: 'top-nav-item',
        events:{
            "click": "onSelectableItemClick"
        },
        initialize: function(options) {
            assert.ok(options.group);

            this.group = options.group;
            this.$_template = HandleBars.compile(topNavItemTpl);
            this.group.on("change", this.render);
            this.render();
        },
        render: function() {
            this.$el.html(this.$_template(this.group.toJSON()));
        },
        getModel: function() {
            return this.group;
        },
        destroy: function () {
            // TODO: Implementation
        }
    });
    return TopNavItemView;
});