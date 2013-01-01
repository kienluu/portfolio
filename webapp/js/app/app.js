define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/collections/GroupCollection',
        'app/collections/ProjectCollection'
    ],
    function($, _, backbone,
        GroupCollection, ProjectCollection) {
        var gc = new GroupCollection();
        gc.fetch();
        window.gc = gc;
        return 'App string test';
    }
);