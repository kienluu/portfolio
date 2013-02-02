define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/collections/BaseCollection',
    'app/models/ProjectModel'
], function ($, _, Backbone, HandleBars,
             BaseCollection, ProjectModel) {
    return BaseCollection.extend({
        model: ProjectModel,
        resourceName: 'project'
    });
});