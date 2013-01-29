define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates
    'text!app/templates/TopNavTpl.hbs',
    // App
    'app/collections/GroupCollection',
    'app/views/TopNavItemView',
    'app/views/SelectableItemParentMixin'
], function ($, _, Backbone, HandleBars
        , topNavViewTpl
        , GroupCollection
        , TopNavItemView
        , SelectableItemParentMixin
    ) {
    var TopNavView = Backbone.View.extendWithMixin([SelectableItemParentMixin], {
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

            this.$_template = HandleBars.compile(topNavViewTpl);
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
            itemView.on('selectableitem:selected', this.onSelectableItemSelected, this);
            this.$ul.append(itemView.$el);
            /*
               TODO: If this was dynamic, I would need a sorting method,
               maybe a way to sync the itemViews and itemView dom elements order
               in the ul to the collection order.
            _.sortBy(this.itemViews);
            */
        },
        // SelectableItemParentMixin method
        getSelectableItemViews: function () {
            return this.itemViews;
        }
    });
    return TopNavView;
});