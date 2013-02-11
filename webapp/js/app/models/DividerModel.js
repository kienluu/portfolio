define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
    // App
], function ($, _, Backbone, HandleBars) {

    return Backbone.Model.extend({
        classHash: function () {
            this.constructor.classHash();
        }
    }, {
        // CLASS PROPERTIES
        classHash: function() {
            return 'app.models.DividerModel';
        }
    });
});