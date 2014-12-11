angular.module('gvibe.controllers')

.controller('VoteInfoCtrl', function ($scope, $ionicPopup, vote, places, device) {
    $scope.emotion = vote.emotion.name;
    $scope.place = null;
    $scope.device = null;
    $scope.vote = vote;

    $scope.sendVibe = function () {
        vote.save().then(voteSuccess, voteFail);
    }

    $scope.getClassFor = function (emotion) {
        var cls = "";
        switch (emotion) {
            case "happy": cls = 'button-balanced'; break;
            case "fun": cls = 'button-fun'; break;
            case "angry": cls = 'button-assertive'; break;
            case "cool": cls = 'button-calm'; break;
            case "excited": cls = 'button-light'; break;
            case "pain": cls = 'button-pain'; break;
            case "indifferent": cls = 'button-stable'; break;
            case "sad": cls = 'button-royal'; break;
            case "bored": cls = 'button-dark'; break;
        }

        return cls;
    }
    
    var voteSuccess = function(){
        $ionicPopup.alert({
            title: 'Thanks for voting!',
            template: 'Your vibe has been received'
        });
    }

    var voteFail = function(){
        $ionicPopup.alert({
            title: 'Ops, something went wrong!',
            template: 'We couldn\'t register your vibe'
        });
    }

    //TODO: move this code to a prior stage so that is earlier calculated
    var init = function () {

        //init google places
        if (vote.place.name == null) {
            places.getPlace().then(function (gPlace) {
                vote.setPlace(gPlace);
                $scope.place = vote.place;
            });
        }
        else {
            $scope.place = vote.place;
        }

        //init cordova device info
        device.getDeviceInfo().then(function (device) {
            $scope.device = device;
        });
    }

    init();
});



