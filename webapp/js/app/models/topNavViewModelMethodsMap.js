define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/views/GroupNavItemView',
    'app/models/GroupModel',
    'app/views/PageNavItemView',
    'app/models/PageModel',
    'app/views/TopNavDividerItemView',
    'app/models/DividerModel'

], function($, _, Backbone, HandleBars
    , GroupNavItemView
    , GroupModel
    , PageNavItemView
    , PageModel
    , TopNavDividerItemView
    , DividerModel
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

    var dividerModelMethods = function (model, topNavView) {
        return {
            getCollectionItemViewClass: function() {
                return TopNavDividerItemView
            },
            getCollectionItemViewOptions: function() {
                return {model: model};
            }
        };
    };

    map = {}
    map[PageModel.classHash()] = pageModelMethods;
    map[GroupModel.classHash()] = groupModelMethods;
    map[DividerModel.classHash()] = dividerModelMethods;
    return map;

});