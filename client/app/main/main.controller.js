'use strict';

angular.module('phpHireTestApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.awesomeThings = [];

        $http.get('/api/things').success(function (awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });

        $scope.map = {
            center: {
                latitude: 51.219053,
                longitude: 4.404418
            },
            zoom: 14
        };
        $scope.options = {
            scrollwheel: false
        };

        $scope.result = 'hidden'
        $scope.resultMessage;
        $scope.formData; //formData is an object holding the name, email, subject, and message
        $scope.submitButtonDisabled = false;
        $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
        $scope.submit = function (contactform) {
            $scope.submitted = true;
            $scope.submitButtonDisabled = true;
            if (contactform.$valid) {
                $http({
                    method: 'POST',
                    url: 'https://silver-course-808.appspot.com/',
                    data: $.param($scope.formData), //param method from jQuery
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).success(function (data) {
                    console.log(data);
                    if (data.success) { //success comes from the return json object
                        $scope.submitButtonDisabled = true;
                        $scope.resultMessage = data.message;
                        $scope.result = 'bg-success';
                    } else {
                        $scope.submitButtonDisabled = false;
                        $scope.resultMessage = data.message;
                        $scope.result = 'bg-danger';
                    }
                });
            } else {
                $scope.submitButtonDisabled = false;
                $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
                $scope.result = 'bg-danger';
            }
        };
    });
