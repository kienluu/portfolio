define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'app/collections/BaseCollection',
    'app/models/GroupModel'
], function ($, _, Backbone, HandleBars,
             BaseCollection, GroupModel) {
    BaseCollection.extend({
        model: GroupModel,
        resourceName: 'group'
    });
});