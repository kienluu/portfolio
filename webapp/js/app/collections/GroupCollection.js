define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    'app/collections/BaseCollection',
    'app/models/GroupModel'
], function ($, _, Backbone, HandleBars,
             BaseCollection, GroupModel) {
    var GroupCollection = BaseCollection.extend({
        model: GroupModel,
        resourceName: 'group'
    });
    return GroupCollection;
});