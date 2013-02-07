define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/models/ProjectModel',
    'app/collections/ProjectCollection'
], function ($, _, Backbone, HandleBars,
        ProjectModel, ProjectCollection) {

    return Backbone.RelationalModel.extend({
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
        }],
        getSlug: function () {
            // This will be the name used in the backbone router.
            return this.get('slug');
        },
        classHash: function () {
            this.constructor.classHash();
        }
    }, {
    // CLASS PROPERTIES
        classHash: function() {
            return 'app.models.GroupModel';
        }
    });
});