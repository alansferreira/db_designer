var path = require('path');

module.exports = window.app.directive('entityTable', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            table: '='
        },

        templateUrl: path.join(__dirname, 'ng-entity-table.html'),

        link: function (scope, element) {
            jsPlumb.draggable(element);
        }
    };
});
