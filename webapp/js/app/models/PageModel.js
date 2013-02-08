define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone, HandleBars) {

    return Backbone.RelationalModel.extend({
        defaults: {
            title: "",
            content: null
        },
        idAttribute: 'slug',
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
            return 'app.models.PageModel';
        }
    });
});