define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates
    'text!app/templates/TopNavTpl.hbs',
    // App
    'app/collections/GroupCollection',
    'app/views/TopNavItemView'
], function ($, _, Backbone, HandleBars
        , topNavViewTpl
        , GroupCollection
        , TopNavItemView
    ) {
    var TopNavView = Backbone.View.extend({
        initialize: function(options) {
            assert.ok(options.groups);

            this.itemViews = [];
            this.groups = options.groups;
            this.groups.on('reset', this.onReset, this);
            this.groups.on('add', this.onAdd, this);
            this.groups.on('change reset', this.render, this);
            /* Use this to see what kind of Events gets called
            this.groups.on('all', function(event, object, xhr){
                console.log(event);
            }, this);
            */

            this.$_template = Handlebars.compile(topNavViewTpl);
            this.$el.html(this.template());
            this.$ul = this.$('ul');
        },
        render: function () {
            _.each(this.itemViews, function(itemView){
                itemView.render();
            }, this);
        },
        template: function() {
            return this.$_template({
                groups: this.groups.toJSON()
            });
        },
        onReset: function() {
            _.each(this.groups.models, this.addItem, this);
        },
        onAdd: function(group, collection) {
            this.addItem(group);
        },
        addItem: function(group) {
            // Create a TopNavItemView and add it to the view
            var itemView = new TopNavItemView({group: group});
            this.itemViews.push(itemView);
            itemView.on('selected', this.onItemSelected, this);
            this.$ul.append(itemView.$el);
            // TODO: If this was dynamic, I would need a sorting method,
            // maybe a way to sync the itemViews and itemView dom elements order
            // in the ul to the collection order.
            //_.sortBy(this.itemViews);
        },
        onItemSelected: function(e, t) {
            // Make this itemView the selected item and load the sidebar view from it
            _.each(this.itemViews, function(itemView){
                if (itemView !== t){
                    itemView.isSelected = false;
                }
            }, this);
            // TODO: Create Sidebar here
        }
    });
    return TopNavView;
});