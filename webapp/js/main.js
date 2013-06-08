/*
 TODO: I want a way to load in a shared config file without polluting the
 global name space.  I have tried to require in a config.js file that is a
 module file which uses the require define function.  Once this is required in
 I run require.config with the passed in object literal.  But this did not.
 The latter require js in this file which loads in the main app doesn't use
 the correct path.
*/

require.config({
    // Load modules from js/lib directory by default.
    baseUrl: 'js/',
    // Configure other paths here.
    paths: {
        // Directory reroute.
        templates: '../templates/',
        // Library paths.
        // jquery library must use the name jquery unless edit the file.
        jquery: 'lib/jquery/jquery.core',
        'jquery.waitForImages': 'lib/jquery/jquery.waitforimages',
        'jquery.all': 'lib/jquery/jquery.all',
        underscore: 'lib/underscore/underscore',
        'underscore.core': 'lib/underscore/underscore.core',
        'underscore.string': 'lib/underscore/plugins/underscore.string',
        backbone: 'lib/backbone/backbone',
        'backbone.core': 'lib/backbone/backbone.core',
        'backbone.relational': 'lib/backbone/plugins/backbone.relational',
        'backbone.mixin': 'lib/backbone/plugins/backbone.mixin',
        handlebars: 'lib/handlebars/handlebars',
        text: 'lib/requirejs/plugins/text'
    },
    // Seconds to wait before giving up on loading a script.
    // TODO: Need error handling if scripts do not load.
    waitSeconds: 5,
    shim: {
        'jquery.waitForImages':{
            deps: ['jquery']
        },
        'underscore.core': {
            exports: '_'
        },
        'underscore.string': {
            deps: ['underscore.core']
        },
        'backbone.core': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.relational': {
            deps: ['backbone.core']
        },
        handlebars: {
            exports: 'Handlebars'
        }
//        'app.App': ['backbone.core']
    }
});

require(
    [
        'jquery.all',
        'underscore',
        'backbone',
        'app/App'
    ],
    function($, _, Backbone, App) {
        var app = new App();
    }
);
