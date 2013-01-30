define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone, HandleBars) {
    var test = 'collection';
    var CollectionViewMixin = {
        itemViewDictList: [],
        initCollectionView: function () {
            var collection = this.getCollection();
            collection.on('reset', this.onCollectionReset, this);
            collection.on('add', this.onCollectionAdd, this);
            collection.on('remove', this.onCollectionRemove, this);
            collection.on('change reset', function () {
                this.collectionRenderItemViews();
            }, this);
        },
        getCollection: function () {
            throw "Please override this abstract method.";
        },
        getCollectionItemViewClass: function (model) {
            throw "Please override this abstract method";
        },
        getCollectionItemViewDictFromModel: function (model) {
            var matchIndex;
            _(this.itemViewDictList).every(function (itemViewDict, index) {
                if (itemViewDict.model === model) {
                    matchIndex = index;
                    return false;
                }
                return true;
            });
            return matchIndex;
        },
        getCollectionItemViewOptions: function (model) {
            return {model:model};
        },
        onCollectionReset: function(collection, options) {
            _.each(this.itemViewDictList, function (itemViewDictList) {
                this.collectionRemoveItem(itemViewDictList.model, collection);
            }, this);
            this.itemViewDictList = [];

            _.each(this.getCollection().models, this.collectionAddItem, this);
        },
        onCollectionAdd: function(model, collection) {
            this.collectionAddItem(model);
        },
        onCollectionRemove: function(model, collection) {
            this.collectionRemoveItem(model, collection);
        },
        collectionRemoveItem: function(model, collection) {
            var removeIndex = this.getCollectionItemViewDictFromModel(model);
            if (removeIndex === undefined) return;
            var itemViewDict = this.itemViewDictList.splice(removeIndex, 1);

            this.trigger('collectionview:removeitem', itemViewDict);
        },
        collectionAddItem: function(model) {
            // Create a TopNavItemView and add it to the view
            var ItemViewClass = this.getCollectionItemViewClass();
            var itemView = new ItemViewClass(this.getCollectionItemViewOptions(model));
            var itemViewDict = {view:itemView, model: model};
            this.itemViewDictList.push(itemViewDict);
            this.collectionAppendItemView(itemView);
            this.trigger('collectionview:additem', itemViewDict);
            /*
            TODO: Handle sorting of views.
             */
        },
        collectionAppendItemView: function (itemView) {
            this.$el.append(itemView.$el);
        },
        collectionRenderItemViews: function () {
            _.each(this.itemViewDictList, function(itemViewDict){
                itemViewDict.view.render();
            }, this);
        }
    };
    return CollectionViewMixin;
});