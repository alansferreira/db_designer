var path = require('path');
var pendingConnections = [];
var addedEntities = {};

module.exports = window.app.directive('entityTable', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            table: '='
        },

        templateUrl: path.join(__dirname, 'ng-entity-table.html'),

        link: function (scope, element) {
            var { table } = scope;
            if(!table) return;
            
            addedEntities[table.name] = {$el: element};

            if (table.foreignKeys) {
                for (var f = 0; f < table.foreignKeys.length; f++) {
                    var fk = table.foreignKeys[f];
                    pendingConnections.push({ table: table, fk: fk });
                }
            }
            
            //jsPlumb.makeTarget(element, {anchor: 'Continuous'});
            jsPlumb.draggable($(element), {containment:true, grid:[4,4]});
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
                anchor:"Continuous"
            });

            pendingConnections.splice(f, 1);
        }
    }

}