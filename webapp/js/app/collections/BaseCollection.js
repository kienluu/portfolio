define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone, HandleBars) {
    var BaseCollection = Backbone.Collection.extend({
        apiRoot: "/api/v1/",
        url: function (models) {
            if (!this.resourceName){
                throw Error('resource name is not set.');
            }
            return this.apiRoot + this.resourceName + '/' +
                ( models ? 'set/' + _.pluck( models, 'id' ).join(';') + '/' : '' );
        },
        parse: function(response) {
            return response.objects;
        }
    });
    return BaseCollection;
});