var path = require('path');
var editor = null;

/**
 * Register chrome-tabs directive on predefined angular module
 * @param {*} appModule predefined angular module 
 * var app = angular.module('app', []); require('chrome-tab.directive')(app);
 */
function registerDirective(appModule) {

    return appModule.directive('entityColumn', function () {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                column: '=', 
            },

            templateUrl: path.join(__dirname, 'entity-column.tmpl.html'),

            link: function (scope, element) {
                var { datatype, datatypes } = scope;
                scope.fn_Keydown = fn_Keydown;


            },

        };
        function fn_Keydown(evt){
            console.log(evt);
        }


    });

};

module.exports = registerDirective;