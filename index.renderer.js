var appConfig = require('./app.config');

require('jsplumb');


var Datastore = require('nedb');
var angular = require('angular');
var path = require('path');
var electron = require('electron').remote; 
var dialog = electron.dialog;

var db = {
  ui: new Datastore({ filename: __dirname + '/data/ui.nedb' }), 
  history: new Datastore({ filename: __dirname + '/data/history.nedb' }), 
};

db.ui.loadDatabase();
db.history.loadDatabase();

var app = angular.module('app', [
  require('angular-material'), 
  require('angular-material-icons'), 
  require('angular-sanitize')
]);

var _currentWindow = electron.getCurrentWindow();

app.config(function ($mdThemingProvider) {
    $mdThemingProvider
        .theme('default')
        .primaryPalette('yellow')
        .accentPalette('grey', { 'default': '700' })
        .dark();
});

var mainControll = app.controller('mainControll', function ($scope, $mdDialog, $sce) {

    $scope.data = {
        ui: {}, 
        history: []
    };

    $scope.methods = {};
    $scope.methods.trustAsHtml = function(html){
        return $sce.trustAsHtml(html);
    }
    
    db.ui.findOne({}, function (err, doc) {
        var _apply = function(_err, _doc){$scope.data.ui = _doc;};
        if(err || !doc) {
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

    $scope.methods.saveProfile = function(){
        var data = Object.assign({}, $scope.data);
        db.update({_id: data._id}, data, {}, function(err, numReplaced){
            if(err) return console.log('not saved');
            console.log('saved!')
        });
    };
});



// var sourceAnchors = [[0.2, 0, 0, -1], [1, 0.2, 1, 0], [0.8, 1, 0, 1], [0, 0.8, -1, 0] ];
// var targetAnchors = [[0.6, 0, 0, -1], [1, 0.6, 1, 0], [0.4, 1, 0, 1], [0, 0.4, -1, 0] ];
// var exampleColor = '#00f';
// var exampleDropOptions = {
//          tolerance:'touch',
//          hoverClass:'dropHover',
//          activeClass:'dragActive'
// };
// var connector = [ "Bezier", { cssClass:"connectorClass", hoverClass:"connectorHoverClass" } ];
// var connectorStyle = {
//     gradient:{stops:[[0, exampleColor], [0.5, '#09098e'], [1, exampleColor]]},
//     lineWidth:5,
//     strokeStyle:exampleColor
// };
// var hoverStyle = {
//     strokeStyle:"#449999"
// };
// var overlays = [ ["Diamond", { fillStyle:"#09098e", width:15, length:15 } ] ];
// var endpoint = ["Dot", { cssClass:"endpointClass", radius:10, hoverClass:"endpointHoverClass" } ];
// var endpointStyle = { fillStyle:exampleColor };
// var anEndpoint = {
//     endpoint:endpoint,
//     paintStyle:endpointStyle,
//     hoverPaintStyle:{ fillStyle:"#449999" },
//     isSource:true, 
//     isTarget:true, 
//     maxConnections:-1, 
//     connector:connector,
//     connectorStyle:connectorStyle,
//     connectorHoverStyle:hoverStyle,
//     connectorOverlays:overlays
// };

// jsPlumb.DefaultDragOptions = { cursor: 'pointer', zIndex:2000 };
// endpoints = {};
// // ask jsPlumb for a selector for the window class
// divsWithWindowClass = jsPlumb.getSelector(".ent");


$(".ent").draggable({   
    containment: 'body',   
    scroll: false 
});
