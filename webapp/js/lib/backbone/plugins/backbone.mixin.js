/*
    Description
    ===

    This Backbone plugin allows an adding mixins via the mixins property of a Backbone View Model Router or Collection.

    When there are property name collisions.  The first objects in the mixins array has the highest priority.
 */

define([
    'jquery.all',
    'underscore',
    'backbone.core'
], function ($, _, Backbone) {
    // Backbone's View, Model, Router and Collection all point to the same extend function.  So we only need to point to one of these.
    var extendWithMixin = function (mixins, protoProps, staticProps) {
        if (!_.isArray(mixins)){
            throw "mixins must be an Array";
        }
        var mixedinProtoProps = _.defaults.apply(this, [protoProps].concat(mixins));
        return this.extend.call(this, mixedinProtoProps, staticProps);
    }
    Backbone.View.extendWithMixin = Backbone.Model.extendWithMixin =
            Backbone.Router.extendWithMixin = Backbone.Collection.extendWithMixin = extendWithMixin;
});