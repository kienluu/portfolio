
define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates
    'text!app/templates/pageNavItemTpl.hbs',
    // App
    'app/views/TopNavItemView'
], function ($, _, Backbone, HandleBars
    , pageNavItemTpl
    , TopNavItemView
    ) {
    return TopNavItemView.extend({
        itemTpl: pageNavItemTpl,
        initialize: function(options) {
            assert.ok(options.page);

            this.page = options.page;
            this.page.on("change", this.render);

            this.$_template = HandleBars.compile(this.itemTpl);
            this.render();
        },
        render: function() {
            this.$el.html(this.$_template({
                page: this.page.toJSON(),
                slug: this.page.getSlug()
            }));
        },
        getModel: function() {
            return this.page;
        },
        destroy: function () {
            // TODO: Implementation
        }
    });
});