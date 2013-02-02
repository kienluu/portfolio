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
    'app/views/CollectionViewMixin',
    'app/views/CollectionViewFindByModelMixin'

], function ($, _, Backbone, HandleBars
        , topNavViewHtml
        , GroupCollection
        , TopNavItemView
        , SelectableItemParentMixin
        , CollectionViewMixin
        , CollectionViewFindByModelMixin
    ) {
    return Backbone.View.extendWithMixin([SelectableItemParentMixin, CollectionViewMixin, CollectionViewFindByModelMixin], {
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

            this.on('collectionview:additem', function (itemViewDict) {
                itemViewDict.view.on('selectableitem:selected', this.onSelectableItemSelected, this);
            }, this);
            this.on('collectionview:removeitem', function (itemViewDict) {
                itemViewDict.view.remove();
            }, this);
            this.initCollectionView();
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
        },
        // CollectionViewFindByModelMixin methods
        getCollectionItemViewModelAttrName: function(){
            return 'group';
        },

        destroy: function () {
            // TODO: Implementation
        }

    });
});