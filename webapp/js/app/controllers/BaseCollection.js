define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone, HandleBars) {
    Backbone.Collection.extend({
        apiRoot: "/api/v1/",
        url: function (models) {
            if (!this.resourceName){
                throw Error('resource name is not set.');
            }
            return this.apiRoot + this.resourceName + ( models ? 'set/' + _.pluck( models, 'id' ).join(';') + '/' : '' );
        }
    });
});