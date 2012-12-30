define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'app/collections/BaseCollection',
    'app/models/ProjectModel'
], function ($, _, Backbone, HandleBars,
             BaseCollection, ProjectModel) {
    BaseCollection.extend({
        model: ProjectModel,
        resourceName: 'project'
    });
});