define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/utilities/OnReadyMixin',
    'app/collections/GroupCollection',
    'app/views/TopNavView',
    'app/views/SidebarView'
], function ($, _, Backbone, HandleBars
    , OnReadyMixin
    , GroupCollection
    , TopNavView
    , SidebarView
    ) {
    var GroupRouter = Backbone.Router.extendWithMixin([OnReadyMixin],{
        routes: {
            'group/:groupname': 'openGroup',
            'group/:groupname-:projectname': 'openProject'
        },
        openGroup: function (groupName) {
            this.runWhenReady(function() {
                var group = this.topNavView.collectionFindItemViewDictByModelSlug(groupName).model;
                if (this.currentGroup && this.currentGroup === group) return;
                this.currentGroup = group;
                this.prevSidebar = this.sidebar;
                this.sidebar = new SidebarView({collection:group.get('projects')});
                this.sidebar.on('selectableitem:selected', this.onSidebarItemSelected, this);
                // FIXME: jquery empty remove events.  Will this remove Backbone events?
                this.$sidebarBox.empty().append(this.sidebar.$el);
                if (this.prevSidebar){
                    this.prevSidebar.destroy();
                }
                this.trigger('sidebar:created', this.sidebar);
            });
        },
        openProject: function (groupName, projectName) {
            this.runWhenReady(function() {
                this.openGroup(groupName);
                var project = this.collectionFindItemViewDictByModelSlug(projectName).model;
                this.$contentBox.html(project.get('content'));
            });
        },
        initialize: function(options) {
            this.$navBox = options.$navBox;
            this.$sidebarBox = options.$sidebarBox;
            this.$contentBox = options.$contentBox;

            this.groups = new GroupCollection();
            window.groups = this.groups;
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
    return GroupRouter;
});