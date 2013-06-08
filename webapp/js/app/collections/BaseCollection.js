define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone, HandleBars) {
    return Backbone.Collection.extend({
        apiRoot: "/json/api/v1/",
        url: function (models) {
            if (!this.resourceName){
                throw Error('resource name is not set.');
            }
            return this.apiRoot + this.resourceName + '/response.json';
//            return this.apiRoot + this.resourceName + '/' +
//                ( models ? 'set/' + _.pluck( models, 'id' ).join(';') + '/' : '' );
        },
        parse: function(response) {
            return response.objects;
        }
    });
});