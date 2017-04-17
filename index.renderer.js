var appConfig = require('./app.config');
var connector = require('./jq-simple-connect');

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

connector.connect("#div_a", "#div_b", {radius: 8, color: 'green'});

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