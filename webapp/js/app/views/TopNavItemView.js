define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates

    // App
    'app/views/SelectableItemMixin'
], function ($, _, Backbone, HandleBars
    , SelectableItemMixin
    ) {
    return Backbone.View.extendWithMixin([SelectableItemMixin], {
        tagName: 'li',
        className: 'top-nav-item',
        events:{
            "click": "onSelectableItemClick"
        }
    });
});