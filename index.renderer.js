var appConfig = require('./app.config');

var Datastore = require('nedb');
var angular = require('angular');
var path = require('path');
var electron = require('electron').remote;
var fs = require('fs');


var ngDragDrop = require('angular-drag-and-drop-lists');

var dialog = electron.dialog;

var db = {
    ui: new Datastore({ filename: __dirname + '/data/ui.nedb' }),
    history: new Datastore({ filename: __dirname + '/data/history.nedb' }),
};

db.ui.loadDatabase();
db.history.loadDatabase();

var ngEditable = require('js-editable.angular');

window.app = angular.module('app', [
    require('angular-material'), 
    require('angular-material-icons'), 
    require('angular-sanitize'), 
    'ngEditable'
]);



require('./directives/entity-table/entity-table.directive')(window.app)


var _currentWindow = electron.getCurrentWindow();

app.config(function ($mdThemingProvider) {
    $mdThemingProvider
        .theme('default')
        .primaryPalette('yellow')
        .accentPalette('grey', { 'default': '700' })
        .dark();
});


var { DB2 } = require("cds-parsers");
var { parseColumn, parseTable, Table, Column, ForeignKey, ColumnReferenceSpec, ColumnIndexSpec } = DB2;

var designerControll = window.app.controller('designerControll', function ($scope, $sce) {

    $scope.data = {
        entities: [
            // new Table({
            //     name: "Department",
            //     columns: [
            //         { name: "DepartmentID", type: "INT", isPrimaryKey: true },
            //         { name: "Name", type: "VARCHAR", isPrimaryKey: false },
            //         { name: "Description", type: "VARCHAR", isPrimaryKey: false },
            //     ],
            //     foreignKeys: [
            //         new ForeignKey({
            //             name: 'ref2',
            //             targetTable: 'Employee',
            //             columns: [new ColumnReferenceSpec({ mapReference: { 'DepartmentId': 'Name' } })]
            //         }),
            //         new ForeignKey({
            //             name: 'ref2',
            //             targetTable: 'Department',
            //             columns: [new ColumnReferenceSpec({ mapReference: { 'Name': 'Name' } })]
            //         })
                
            //     ]
            // }),
            // new Table({
            //     name: "Employee",
            //     columns: [
            //         { name: "EmployyeID", type: "INT", isPrimaryKey: true },
            //         { name: "Name", type: "VARCHAR", isPrimaryKey: false },
            //         { name: "Surname", type: "VARCHAR", isPrimaryKey: false },
            //         { name: "Email", type: "VARCHAR", isPrimaryKey: false },
            //         { name: "Phone", type: "VARCHAR", isPrimaryKey: false },
            //     ],
            //     foreignKeys: [
            //         new ForeignKey({
            //             name: 'ref1',
            //             targetTable: 'Position',
            //             columns: [new ColumnReferenceSpec({ mapReference: { 'Surname': 'PositionID' } })]
            //         })
            //     ]
            // }),
            // new Table({
            //     name: "Position",
            //     columns: [
            //         { name: "PositionID", type: "INT", isPrimaryKey: true },
            //         { name: "Name", type: "VARCHAR", isPrimaryKey: false },
            //         { name: "Description", type: "VARCHAR", isPrimaryKey: false },
            //     ]
            // }),
        ],
        history: []
    };

    var db2Script = new String(fs.readFileSync('./db2-sample.sql'));
    $scope.data.entities = parseTable(db2Script);
    console.log($scope.data.entities);

    $scope.methods = {};
    $scope.methods.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
    }

    $scope.uievents = {};
    $scope.uievents.entity_click = function(evt, entity){
        console.log({left: entity.left, top: entity.top});
    };
    db.ui.findOne({}, function (err, doc) {
        var _apply = function (_err, _doc) { $scope.data.ui = _doc; };
        if (err || !doc) {
            db.ui.insert($scope.data.ui, _apply);
            return;
        }
        _apply(err, doc);
    });

    db.history.find({}, function (err, history) {
        $scope.data.history = history || [];
    });

    // $scope.showConfig = function (ev) {
    //     $mdDialog.show({
    //         controller: DialogController,
    //         templateUrl: 'dialog.config.tmpl.html',
    //         parent: angular.element(document.body),
    //         targetEvent: ev,
    //         clickOutsideToClose: true, 
    //         fullscreen: true, 
    //         locals: $scope.data.config
    //     })
    //     .then(function (config) {
    //         $scope.data = config;
    //     }, function () {
    //         //$scope.data.dicoverText = '';
    //     });
    // };
    // function DialogController($scope, $mdDialog, locals) {
    //     $scope.data = locals;
    //     $scope.hide = function() {
    //         $mdDialog.hide();
    //     };

    //     $scope.cancel = function() {
    //         $mdDialog.cancel();
    //     };

    //     $scope.ok = function(data) {
    //         $mdDialog.hide(data);
    //     };
    // };

    $scope.methods.saveProfile = function () {
        var data = Object.assign({}, $scope.data);
        db.update({ _id: data._id }, data, {}, function (err, numReplaced) {
            if (err) return console.log('not saved');
            console.log('saved!')
        });
    };

});



