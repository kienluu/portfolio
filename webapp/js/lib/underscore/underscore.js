define([
    'underscore.core',
    // Place plugins here
    'underscore.string'
], function (_, string) {
    _.str = string;
    _.mixin(string);
    return _;
});