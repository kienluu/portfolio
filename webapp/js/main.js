/*
 TODO: I want to a way to load in a shared config file without polluting the
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
        jquery: 'lib/jquery/jquery',
        underscore: 'lib/underscore/underscore',
        backbone: 'lib/backbone/backbone',
        handlebars: 'lib/handlebars/handlebars',
        text: 'lib/requirejs/plugins/text'
    },
    // Seconds to wait before giving up on loading a script.
    // TODO: Need error handling if scripts do not load.
    waitSeconds: 15,
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.relational': {
            deps: ['backbone']
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});

require(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/app'
    ],
    function($, _, Backbone, App) {
        console.log('test');
        new App();
    }
);
