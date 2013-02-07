define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/views/GroupNavItemView',
    'app/models/GroupModel',
    'app/views/PageNavItemView',
    'app/models/PageModel'

], function($, _, Backbone, HandleBars
    , GroupNavItemView
    , GroupModel
    , PageNavItemView
    , PageModel
    ) {
    var pageModelMethods = function (model, topNavView) {
        return {
            getCollectionItemViewClass: function() {
                return PageNavItemView
            },
            getCollectionItemViewOptions: function() {
                return {page: model};
            }
        };
    };

    var groupModelMethods = function (model, topNavView) {
        return {
            getCollectionItemViewClass: function() {
                return GroupNavItemView
            },
            getCollectionItemViewOptions: function() {
                return {group: model};
            }
        };
    };
    map = {}
    map[PageModel.classHash()] = pageModelMethods;
    map[GroupModel.classHash()] = groupModelMethods;
    return map;

});