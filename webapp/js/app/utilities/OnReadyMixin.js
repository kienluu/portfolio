define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, HandleBars) {
    return {
        _fullyReady: false,
        runWhenReady: function(onReady) {
            // The name fullyready is used to avoid name clash with dom event ready.
            if (this._fullReady){
                onReady.call(this);
                return;
            }
            this.on('fullyready', function() {
                onReady.call(this);
            }, this);
        },
        setReady: function() {
            this._fullReady = true;
            this.trigger.apply(this, ['fullyready'].concat(this.arguments));
        },
        isReady: function() {
            return this._fullyReady;
        }
    };
});