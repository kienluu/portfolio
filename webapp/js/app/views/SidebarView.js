define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates
    'text!app/templates/sidebarTpl.html',
    // App
    'app/views/ProjectSidebarItemView',
    'app/views/SelectableItemParentMixin',
    'app/views/CollectionViewMixin'

], function ($, _, Backbone, HandleBars
    , sidebarTpl

    , ProjectSidebarItemView
    , SelectableItemParentMixin
    , CollectionViewMixin
    ) {
    var SidebarView = Backbone.View.extendWithMixin([SelectableItemParentMixin, CollectionViewMixin], {
        initialize: function(options) {
            assert.ok(options.collection);

            this.collection = options.collection;
            /* Use this to see what kind of Events gets called
             this.groups.on('all', function(event, object, xhr){
             console.log(event);
             }, this);
             */

            this.setElement($(sidebarTpl));
            this.$ul = this.$('ul');

            this.on('collectionview:additem', function (itemViewDict) {
                itemViewDict.view.on('selectableitem:selected', this.onSelectableItemSelected, this);
            }, this);
            this.on('collectionview:removeitem', function (itemViewDict) {
                itemViewDict.view.off('selectableitem:selected', this.onSelectableItemSelected, this);
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
        getCollectionItemViewClass: function () {
            return ProjectSidebarItemView;
        },
        getCollectionItemViewOptions: function (model) {
            return { project: model };
        },
        collectionAppendItemView: function (itemView) {
            this.$ul.append(itemView.$el);
        },
        // SelectableItemParentMixin method
        getSelectableItemViews: function () {
            return this.getCollectionItemViews();
        },
        destroy: function () {
            this.remove();
            this.off();
            this.collectionDestroyItemViews();
        }
    });
    return SidebarView;
});