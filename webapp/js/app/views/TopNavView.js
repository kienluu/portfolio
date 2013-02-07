define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates
    'text!app/templates/TopNavTpl.html',
    // App
    'app/collections/GroupCollection',
    'app/models/GroupModel',
    'app/views/GroupNavItemView',
    'app/collections/PageCollection',
    'app/models/PageModel',
    'app/views/PageNavItemView',
    'app/models/topNavViewModelMethodsMap',
    'app/views/SelectableItemParentMixin',
    'app/views/CollectionViewMixin',
    'app/views/CollectionViewFindByModelMixin'

], function ($, _, Backbone, HandleBars
        , topNavViewHtml
        , GroupCollection
        , GroupModel
        , GroupNavItemView
        , PageCollection
        , PageModel
        , PageNavItemView
        , topNavViewModelMethodsMap
        , SelectableItemParentMixin
        , CollectionViewMixin
        , CollectionViewFindByModelMixin
    ) {

    return Backbone.View.extendWithMixin([SelectableItemParentMixin, CollectionViewMixin, CollectionViewFindByModelMixin], {
        initialize: function(options) {
            assert.ok(options.collection);
            // This collection should not have a fetch function as it will consist of mixed classes
            this.collection = options.collection;

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
            return this.collection;
        },
        getCollectionItemViewClass: function (model) {
            return topNavViewModelMethodsMap[model.constructor.classHash()](model, this).getCollectionItemViewClass();
        },
        getCollectionItemViewOptions: function (model) {
            return topNavViewModelMethodsMap[model.constructor.classHash()](model, this).getCollectionItemViewOptions();
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
            return 'getModel';
        },

        destroy: function () {
            // TODO: Implementation
        }

    });
});