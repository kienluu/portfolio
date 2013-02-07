
define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates
    'text!app/templates/groupNavItemTpl.hbs',
    // App
    'app/views/TopNavItemView'
], function ($, _, Backbone, HandleBars
    , groupNavItemTpl
    , TopNavItemView
    ) {
    return TopNavItemView.extend(
        {
        itemTpl: groupNavItemTpl,
        initialize: function(options) {
            assert.ok(options.group);

            this.group = options.group;
            this.group.on("change", this.render);

            this.$_template = HandleBars.compile(this.itemTpl);
            this.render();
        },
        render: function() {
            this.$el.html(this.$_template({
                group: this.group.toJSON(),
                slug: this.group.getSlug()
            }));
        },
        getModel: function() {
            return this.group;
        },
        destroy: function () {
            // TODO: Implementation
        }
    });
});