define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone, HandleBars) {
    var GroupModel = Backbone.model.extend({
        defaults: {
            name: "",
            description: "",
            projects: []
        },
        relations: [{
            type: Backbone.HasMany,
            key: 'projects',
            relatedModel: 'ProjectModel',
            collectionType: 'ProjectCollection',
            reverseRelation: {
                key: 'groupSet',
                includeInJSON: 'id'
            }
        }]
    });

    return GroupModel;
});