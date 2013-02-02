/*
    This is mixin to go along with CollectionViewMixin and models that implements
    for finding a view by its model attribute
 */
define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone, HandleBars) {
    return {
        collectionFindItemViewDictByModelSlug: function(slug) {
            // A lookup table would be better here.  Ideally there should be another CollectionViewModel, that does not allow duplicate slugs then we could use a lookup table on a slug
            var matchedItemViewDict = _.find(this.itemViewDictList, function(dict) {
                var model = dict.view[this.getCollectionItemViewModelAttrName()];
                if (_.isFunction(model)){
                    model = dict.view[this.getCollectionItemViewModelAttrName()]();
                }
                var slugAttrName = this.getCollectionItemViewModelSlugAttrName();
                var slugValue = model.get(slugAttrName);
                if (slugValue === undefined){
                    slugValue = model[slugAttrName];
                    if (_.isFunction(slugValue)){
                        slugValue = model[slugAttrName]();
                    }
                }
                return slugValue === slug;
            }, this);
            return matchedItemViewDict;
        },
        getCollectionItemViewModelAttrName: function() {
            return 'model';
        },
        getCollectionItemViewModelSlugAttrName: function() {
            return 'getSlug';
        }
    };
});