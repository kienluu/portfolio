define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone, HandleBars) {
    var ProjectModel = Backbone.RelationalModel.extend({
        defaults: {
            title: "",
            content: null
        },
        getSlug: function () {
            // This will be the name used in the backbone router.
            return this.get('id');
        }
    });
    return ProjectModel;
});