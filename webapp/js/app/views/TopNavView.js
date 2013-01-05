define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // Templates
    'text!app/templates/topNavView.hbs',
    // App
    'app/collections/GroupCollection'
], function ($, _, Backbone, HandleBars,
        topNavViewTpl,
        GroupCollection
    ) {
    var TopNavView = Backbone.View.extend({
        initialize: function(options) {
            assert.ok(options.groups);
            assert.ok(options.container);

            this.groups = options.groups;
            this.groups.on('change reset', this.render, this);
            this.groups.on('all', function(event, object, xhr){
                console.log(event);
            }, this);

            this.container = options.container;
            this.$container = $(this.container);
            this.$_template = Handlebars.compile(topNavViewTpl);
        },
        render: function () {
            this.$container.html(this.template());
        },
        template: function() {
            return this.$_template({
                groups: this.groups.toJSON()
            });
        }
    });
    return TopNavView;
});