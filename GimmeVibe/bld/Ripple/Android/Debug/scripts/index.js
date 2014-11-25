// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();


        angular.module('ionicApp', ['ionic'])

       .factory("cordova", ['$q', "$window", "$timeout", function ($q, $window, $timeout) {
           var deferred = $q.defer();
           var resolved = false;

           document.addEventListener('deviceready', function () {
               resolved = true;
               deferred.resolve($window.cordova);
           }, false);

           $timeout(function () {
               if (!resolved && $window.cordova) {
                   deferred.resolve($window.cordova);
               }
           });

           return { ready: deferred.promise };
       }])

       .controller('RootCtrl', function ($scope) {
           $scope.onControllerChanged = function (oldController, oldIndex, newController, newIndex) {
               console.log('Controller changed', oldController, oldIndex, newController, newIndex);
               console.log(arguments);
           };
       })

       .controller('HomeCtrl', function ($scope, $timeout, $ionicModal, $ionicActionSheet) {
           $scope.items = [];

           $ionicModal.fromTemplateUrl('newTask.html', function (modal) {
               $scope.settingsModal = modal;
           });

           var removeItem = function (item, button) {
               $ionicActionSheet.show({
                   buttons: [],
                   destructiveText: 'Delete Task',
                   cancelText: 'Cancel',
                   cancel: function () {
                       return true;
                   },
                   destructiveButtonClicked: function () {
                       $scope.items.splice($scope.items.indexOf(item), 1);
                       return true;
                   }
               });
           };

           var completeItem = function (item, button) {
               item.isCompleted = true;
           };

           $scope.onReorder = function (el, start, end) {
               ionic.Utils.arrayMove($scope.items, start, end);
           };

           $scope.onRefresh = function () {
               console.log('ON REFRESH');

               $timeout(function () {
                   $scope.$broadcast('scroll.refreshComplete');
               }, 1000);
           }


           $scope.removeItem = function (item) {
               removeItem(item);
           };

           $scope.newTask = function () {
               $scope.settingsModal.show();
           };

           // Create the items
           for (var i = 0; i < 25; i++) {
               $scope.items.push({
                   title: 'Task ' + (i + 1),
                   buttons: [{
                       text: 'Done',
                       type: 'button-success',
                       onButtonClicked: completeItem,
                   }, {
                       text: 'Delete',
                       type: 'button-danger',
                       onButtonClicked: removeItem,
                   }]
               });
           }

       })

       .controller('TaskCtrl', function ($scope) {
           $scope.close = function () {
               $scope.modal.hide();
           }

           $scope.add = function () {
               $scope.modal.hide();
           }
       });
