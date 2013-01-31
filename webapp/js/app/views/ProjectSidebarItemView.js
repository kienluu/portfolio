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
    var ProjectSidebarItemView = Backbone.View.extendWithMixin([SelectableItemMixin], {
        tagName: 'li',
        className: 'sidebar-nav-item project-type',
        events:{
            "click": "onSelectableItemClick"
        },
        initialize: function(options) {
            assert.ok(options.project);

            this.project = options.project;
            this.$_template = Handlebars.compile(projectItemTpl);
            this.project.on("change", this.render);
            this.render();
        },
        render: function() {
            this.$el.html(this.$_template({project:this.project.toJSON()}));
        }
        
    });
    return ProjectSidebarItemView;
});
