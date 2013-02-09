define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/utilities/OnReadyMixin',
    'app/collections/PageCollection',
    'app/views/TopNavView',
    'app/views/SidebarView'
], function ($, _, Backbone, HandleBars
    , OnReadyMixin
    , GroupCollection
    , TopNavView
    , SidebarView
    ) {
    return Backbone.Router.extendWithMixin([OnReadyMixin],{
        routes: {
        },
        initialize: function(options) {
            this.on('all', function(event, two, three, four){
                console.log('PageRouter: '+event);
            });
        }
    });
});