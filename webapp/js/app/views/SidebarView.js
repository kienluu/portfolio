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
    'app/views/CollectionViewMixin',
    'app/views/CollectionViewFindByModelMixin'
], function ($, _, Backbone, HandleBars
    , sidebarTpl

    , ProjectSidebarItemView
    , SelectableItemParentMixin
    , CollectionViewMixin
    , CollectionViewFindByModelMixin
    ) {
    var SidebarView = Backbone.View.extendWithMixin(
            [SelectableItemParentMixin, CollectionViewMixin, CollectionViewFindByModelMixin], {
        initialize: function(options) {
            assert.ok(options.group);

            this.group = options.group;
            this.collection = this.group.get('projects');
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
            return { project: model, group: this.group };
        },
        collectionAppendItemView: function (itemView) {
            this.$ul.append(itemView.$el);
        },
        // CollectionViewFindByModelMixin methods
        getCollectionItemViewModelAttrName: function(){
            return 'getModel';
        },
        // SelectableItemParentMixin method
        getSelectableItemViews: function () {
            return this.getCollectionItemViews();
        },
        destroy: function () {
            this.remove();
            this.off();
            this.group.off(null, null, this);
            this.collection.off(null, null, this);
            this.collectionDestroyItemViews();
        }
    });
    return SidebarView;
});