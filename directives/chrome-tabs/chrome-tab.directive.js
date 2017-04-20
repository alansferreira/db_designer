var path = require('path');
var ChromeTabs = require('./chrome-tabs');
var angular = require('angular');
    

/**
 * Register chrome-tabs directive on predefined angular module
 * @param {*} appModule predefined angular module 
 * var app = angular.module('app', []); require('chrome-tab.directive')(app);
 */
function registerDirective(appModule){
    return appModule.directive('chromeTab', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                tabs: '=', 
                
                tabChanged: '='

                addedTab: '=',
                removedTab: '=',
            },

            templateUrl: path.join(__dirname, 'chrome-tab.tmpl.html'),

            link: function (scope, element) {
                var chromeTabs = new ChromeTabs();
                var el = element[0];
                
                chromeTabs.init(el, {
                    tabOverlapDistance: 14,
                    minWidth: 45,
                    maxWidth: 243
                });
                el.addEventListener('activeTabChange', ({detail})=>scope.)

                el.addEventListener('tabAdd', scope.addedTab)
                el.addEventListener('tabRemove', scope.removedTab)

                for (var t = 0; t < scope.tabs.length; t++) {
                    var tab = scope.tabs[t];
                    chromeTabs.addTab(tab);
                }

            },

        };
    });

};

module.exports = registerDirective;