define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/collections/BaseCollection',
    'app/models/PageModel'
], function ($, _, Backbone, HandleBars,
             BaseCollection, PageModel) {
    return BaseCollection.extend({
        model: PageModel,
        resourceName: 'page'
    });
});