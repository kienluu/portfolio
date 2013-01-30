define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates
    'text!app/templates/TopNavTpl.html',
    // App
    'app/collections/GroupCollection',
    'app/views/TopNavItemView',
    'app/views/SelectableItemParentMixin',
    'app/views/CollectionViewMixin'

], function ($, _, Backbone, HandleBars
        , topNavViewHtml
        , GroupCollection
        , TopNavItemView
        , SelectableItemParentMixin
        , CollectionViewMixin
    ) {
    var TopNavView = Backbone.View.extendWithMixin([SelectableItemParentMixin, CollectionViewMixin], {
        initialize: function(options) {
            assert.ok(options.groups);

            this.groups = options.groups;
            /* Use this to see what kind of Events gets called
            this.groups.on('all', function(event, object, xhr){
                console.log(event);
            }, this);
            */

            this.setElement($(topNavViewHtml));
            this.$ul = this.$('ul');

            this.initCollectionView();
            this.on('collectionview:additem', function (itemViewDict) {
                itemViewDict.view.on('selectableitem:selected', this.onSelectableItemSelected, this);
            }, this);
            this.on('collectionview:removeitem', function (itemViewDict) {
                itemViewDict.view.off('selectableitem:selected', this.onSelectableItemSelected, this);
            }, this);
        },
        render: function () {
            // This should eitheir stay blank or redraw the this view plus append and draw all the the collection's views again.
        },
        // CollectionViewMixin methods
        getCollection: function () {
            return this.groups;
        },
        getCollectionItemViewClass: function () {
            return TopNavItemView;
        },
        getCollectionItemViewOptions: function (model) {
            return { group: model };
        },
        collectionAppendItemView: function (itemView) {
            this.$ul.append(itemView.$el);
        },
        // SelectableItemParentMixin method
        getSelectableItemViews: function () {
            return this.getCollectionItemViews();
        }
    });
    return TopNavView;
});