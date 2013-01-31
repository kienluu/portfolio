define([
    'jquery.all'
    ,'underscore'
    ,'backbone'
    ,'handlebars'
    // App
    ,'app/views/SelectableItemMixin'
], function($, _, Backbone, HandleBars
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
            this.project.on("change", this.render);
            this.render();
        },
        render: function() {
            this.$el.html($('<a>'+this.project.get('title')+'</a>'));
        }
        
    });
    return ProjectSidebarItemView;
});
