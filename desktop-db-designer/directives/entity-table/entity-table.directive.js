var path = require('path');
var pendingConnections = [];
var addedEntities = {};


/**
 * Register chrome-tabs directive on predefined angular module
 * @param {*} appModule predefined angular module 
 * var app = angular.module('app', []); require('chrome-tab.directive')(app);
 */
function registerDirective(appModule) {
    /**
     * register directive depencencies
     */
    require('../entity-column/entity-column.directive')(appModule);


    return appModule.directive('entityTable', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                table: '='
            },

            templateUrl: path.join(__dirname, 'entity-table.tmpl.html'),
            
            link: function (scope, element) {
                var { table } = scope;
                if (!table) return;

                addedEntities[table.name] = { $el: element };

                if (table.foreignKeys) {
                    for (var f = 0; f < table.foreignKeys.length; f++) {
                        var fk = table.foreignKeys[f];
                        pendingConnections.push({ table: table, fk: fk });
                    }
                }

                //jsPlumb.makeTarget(element, {anchor: 'Continuous'});
                jsPlumb.draggable($(element), { 
                    //containment: true, 
                    grid: [4, 4], 
                    scroll: true,
                    handle: ".header",
                    drag: function(event, ui){
                        var pos = $(event.el).position();
                        table.top = pos.top;
                        table.left = pos.left;
                    },
                    start: function(event, ui){

                    }
                });
                refreshConnections();

            },

        };
    });

    function refreshConnections() {
        for (var f = 0; f < pendingConnections.length; f++) {
            var { table, fk } = pendingConnections[f];
            var srcTable = addedEntities[table.name];
            var dstTable = addedEntities[fk.targetTable];

            if (srcTable && dstTable) {
                jsPlumb.connect({
                    source: jsPlumb.getSelector(srcTable.$el[0]),
                    target: jsPlumb.getSelector(dstTable.$el[0]),
                    connector: 'Bezier',
                    //anchor: "AutoDefault", 
                    //anchor: [ "Perimeter", { shape:"Circle" } ]
                    anchor: "Continuous"
                });

                pendingConnections.splice(f, 1);
            }
        }

    }
};

module.exports = registerDirective;