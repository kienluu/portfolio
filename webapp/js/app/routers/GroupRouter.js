define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/utilities/OnReadyMixin',
    'app/collections/GroupCollection',
    'app/views/TopNavView',
    'app/views/SidebarView',
    'app/views/GroupView',
    'app/views/ProjectView'
], function ($, _, Backbone, HandleBars
    , OnReadyMixin
    , GroupCollection
    , TopNavView
    , SidebarView
    , GroupView
    , ProjectView
    ) {
    return Backbone.Router.extendWithMixin([OnReadyMixin],{
        routes: {
            'group/:groupname': 'openGroup',
            'group/:groupname/:projectname': 'openProject'
        },
        openGroup: function (groupName, isOpenProjectCall) {
            if (isOpenProjectCall==undefined) isOpenProjectCall = false;
            this.runWhenReady(function() {
                var group = this.topNavView.collectionFindItemViewDictByModelSlug(groupName).model;
                if (this.currentGroup && this.currentGroup === group) return;
                this.currentGroup = group;
                this.prevSidebarView = this.sidebarView;
                this.sidebarView = new SidebarView({group: group});
                this.sidebarView.on('selectableitem:selected', this.onSidebarItemSelected, this);
                // FIXME: jquery empty remove events.  Will this remove Backbone events?
                this.sideView.setView(this.sidebarView);
                this.trigger('sidebar:created', this.sidebarView);

                // If this root group url then show the project content
                if (isOpenProjectCall) return;

                var view = new GroupView({group: this.currentGroup});
                this.contentView.setView(view);

            });
        },
        openProject: function (groupName, projectName) {
            this.runWhenReady(function() {
                this.openGroup(groupName, true);
                var project = this.sidebarView.collectionFindItemViewDictByModelSlug(projectName).model;
                var projectView = new ProjectView({project:project});
                this.contentView.setView(projectView);
            });
        },
        initialize: function(options) {
            this.$navBox = options.$navBox;
            this.sideView = options.sideView;
            this.contentView = options.contentView;

            this.groups = new GroupCollection();
            this.topNavView = new TopNavView({
                groups: this.groups
            });
            this.topNavView.on('selectableitem:selected', this.onNavItemSelected, this);
            this.groups.fetch();

            this.groups.once('reset', function(){
                this.$navBox.append(this.topNavView.$el);
                this.setReady();
            }, this);
        },
        onNavItemSelected: function(selectedItemView) {
            // Change the sidebar here.
//            this.navigate('group/'+selectedItemView.getModel().getSlug(), {trigger:true, replace:true});
        },
        onSidebarItemSelected: function(selectedItemView) {
        }
    });
});