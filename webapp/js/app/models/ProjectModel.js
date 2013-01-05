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
        }
    });
    return ProjectModel;
});