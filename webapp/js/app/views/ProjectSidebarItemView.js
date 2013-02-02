define([
    'jquery.all'
    ,'underscore'
    ,'backbone'
    ,'handlebars'
    // Templates
    ,'text!app/templates/projectItemTpl.hbs'
    // App
    ,'app/views/SelectableItemMixin'
], function($, _, Backbone, HandleBars
    , projectItemTpl
    , SelectableItemMixin
    ) {
    return Backbone.View.extendWithMixin([SelectableItemMixin], {
        tagName: 'li',
        className: 'sidebar-nav-item project-type',
        events:{
            "click": "onSelectableItemClick"
        },
        initialize: function(options) {
            assert.ok(options.group);
            assert.ok(options.project);

            this.group = options.group;
            this.project = options.project;
            this.$_template = Handlebars.compile(projectItemTpl);
            this.project.on("change", this.render);
            this.render();
        },
        render: function() {
            this.$el.html(this.$_template({
                project:this.project.toJSON(),
                slug: _.sprintf('group/%s/%s', this.group.getSlug(), this.project.getSlug())
            }));
        },
        getModel: function() {
            return this.project;
        }

    });
});
