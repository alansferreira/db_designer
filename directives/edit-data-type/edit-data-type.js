var path = require('path');
var editor = null;

/**
 * Register chrome-tabs directive on predefined angular module
 * @param {*} appModule predefined angular module 
 * var app = angular.module('app', []); require('chrome-tab.directive')(app);
 */
function registerDirective(appModule) {

    return appModule.directive('editDataType', function () {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=', 
                datatypes: '='
            },

            templateUrl: path.join(__dirname, 'edit-data-type.tmpl.html'),

            link: function (scope, element) {
                var { datatype, datatypes } = scope;


            },

        };
    });

};

module.exports = registerDirective;