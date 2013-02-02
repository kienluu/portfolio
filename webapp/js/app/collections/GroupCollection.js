define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    'app/collections/BaseCollection',
    'app/models/GroupModel'
], function ($, _, Backbone, HandleBars,
             BaseCollection, GroupModel) {
    return BaseCollection.extend({
        model: GroupModel,
        resourceName: 'group'
    });
});