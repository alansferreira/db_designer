var { DB2 } = require("cds-parsers");
var { parseColumn, parseTable, Table, Column, ForeignKey, ColumnReferenceSpec, ColumnIndexSpec } = DB2();

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
                column: '='
            },

            templateUrl: path.join(__dirname, 'entity-column.tmpl.html'),

            link: function (scope, element) {
                var { datatype, datatypes } = scope;
                
                scope.onCommitColumnName= function(){
                    // var c = parseColumn(scope.column.name);
                    // if(c && c.name && c.type && c.precision && c.scale){
                    //     scope.column.name = c.name;
                    //     scope.column.type = c.type;
                    //     scope.column.precision = c.precision;
                    //     scope.column.scale = c.scale;
                    // }
                    console.log(scope.column);
                }

                // $('.column-name', element).mousedown(name_mousedown);
                // $('.column-type', element).mousedown(type_mousedown);
                // $('.column-name', element).mousedown(name_mousedown);
            },

        };
        return directive;
    });

};

module.exports = registerDirective;