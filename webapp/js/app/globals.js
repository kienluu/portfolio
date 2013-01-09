define(['jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    'app/models/GroupModel',
    'app/models/ProjectModel'

], function ($, _, Backbone, HandleBars
    , GroupModel
    , ProjectModel
   ) {
    // Debug variables
    assert.ok(window.DG===undefined,'DG is already defined');
    window.DG = {};
    DG.GroupModel = GroupModel;
    DG.ProjectModel = ProjectModel;
});