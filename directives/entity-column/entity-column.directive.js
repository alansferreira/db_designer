var path = require('path');
var editor = null;

/**
 * Register chrome-tabs directive on predefined angular module
 * @param {*} appModule predefined angular module 
 * var app = angular.module('app', []); require('chrome-tab.directive')(app);
 */
function registerDirective(appModule) {

    return appModule.directive('entityColumn', function () {
        var directive =  {
            restrict: 'E',
            replace: true,
            scope: {
                column: '=', 
            },

            templateUrl: path.join(__dirname, 'entity-column.tmpl.html'),

            link: function (scope, element) {
                var { datatype, datatypes } = scope;
                
                // $('.column-name', element).mousedown(name_mousedown);
                // $('.column-type', element).mousedown(type_mousedown);
                // $('.column-name', element).mousedown(name_mousedown);
            },

        };
        return directive;
    });

};

module.exports = registerDirective;