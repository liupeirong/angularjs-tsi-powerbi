'use strict';
app.controller("homeController", ['$scope', 'adalAuthenticationService', '$location',  
    function ($scope, adalService, $location) {
        // this is referencing adal module to do login
        //userInfo is defined at the $rootscope with adalAngular module

        $scope.init = function () {
            $scope.testMessage = "";
        };
    
        $scope.logout = function () {
            adalService.logOut();
        };
    
        $scope.login = function () {
            adalService.login();
        };

        $scope.embed = function () {
            $location.path("/embed");
        }
    
        // optional
        $scope.$on("adal:loginSuccess", function () {
            $scope.testMessage = "loginSuccess";
        });
    
        // optional
        $scope.$on("adal:loginFailure", function () {
            $scope.testMessage = "loginFailure";
        });
    
        // optional
        $scope.$on("adal:notAuthorized", function (event, rejection, forResource) {
            $scope.testMessage = "It is not Authorized for resource:" + forResource;
        });
}]);