define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/collections/GroupCollection',
    'app/views/TopNavView',
    'app/views/SidebarView'
], function ($, _, Backbone, HandleBars
    , GroupCollection
    , TopNavView
    , SidebarView
    ) {
    var GroupRouter = Backbone.Router.extend({
        routes: {
            'group/:groupname': 'openGroup',
            'group/:groupname-:projectname': 'openProject'
        },
        openGroup: function (groupName) {
            ;
        },
        openProject: function (groupName, ProjectName) {
            openGroup(groupName);

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
                this.trigger('ready');
//                $('.nav-wrapper li').eq(0).click();
            }, this);
        },
        onNavItemSelected: function(selectedItemView) {
            // Change the sidebar here.
            this.prevSidebar = this.sidebar;
            this.sidebar = new SidebarView({collection:selectedItemView.group.get('projects')});
            this.sidebar.on('selectableitem:selected', this.onSidebarItemSelected, this);
            // FIXME: jquery empty remove events.  Will this remove Backbone events?
            this.$sidebarBox.empty().append(this.sidebar.$el);
            if (this.prevSidebar){
                this.prevSidebar.destroy();
            }
            this.trigger('sidebar:created', this.sidebar);
        },
        onSidebarItemSelected: function(selectedItemView) {
            this.$contentBox.html(selectedItemView.project.get('content'));
        }
    });
    return GroupRouter;
});