angular.module('gvibe.controllers')

.controller('IntroCtrl', function ($scope, $state) {

    // Called to navigate to the main app
    var startApp = function () {
        $state.go('home.vote');

        // Set a flag that we finished the tutorial
        window.localStorage['didTutorial'] = true;
    };

    //No this is silly
    // Check if the user already did the tutorial and skip it if so
    if (window.localStorage['didTutorial'] === "true") {
        console.log('Skip intro');
        startApp();
    }

    $scope.startApp = startApp;

    // Move to the next slide
    $scope.next = function () {
        $scope.$broadcast('slideBox.nextSlide');
    };

    var goToNext = function () {
        $scope.next();
    }


    // Bind the left and right buttons to the scope
    $scope.leftButtonContent = 'Skip';
    $scope.rightButtonContent = 'Next';

    $scope.leftButtonClick = startApp;
    $scope.rightButtonClick = goToNext;

    // Called each time the slide changes
    $scope.slideChanged = function (index) {

        // Check if we should update the left buttons
        if (index > 0) {
            // If this is not the first slide, give it a back button
            $scope.leftButtonContent = 'Back';
            $scope.leftButtonClick = function () {
                // Move to the previous slide
                $scope.$broadcast('slideBox.prevSlide');
            }

        } else {
            // This is the first slide, use the default left buttons
            $scope.leftButtonContent = 'Skip';
            $scope.leftButtonClick = startApp;
        }

        // If this is the last slide, set the right button to
        // move to the app
        if (index == 2) {
            $scope.rightButtonContent = 'Start';
            $scope.rightButtonClick = startApp;

        } else {
            // Otherwise, use the default buttons
            $scope.rightButtonContent = 'Next';
            $scope.rightButtonClick = goToNext;
        }
    };
})
