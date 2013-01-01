define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/models/ProjectModel',
    'app/collections/ProjectCollection'
], function ($, _, Backbone, HandleBars,
        ProjectModel, ProjectCollection) {
    var GroupModel = Backbone.RelationalModel.extend({
        defaults: {
            name: "",
            description: "",
            projects: []
        },
        relations: [{
            type: Backbone.HasMany,
            key: 'projects',
            relatedModel: ProjectModel,
            collectionType: ProjectCollection,
            reverseRelation: {
                key: 'groupSet',
                includeInJSON: 'id'
            }
        }]
    });

    return GroupModel;
});