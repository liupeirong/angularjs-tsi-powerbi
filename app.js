'use strict';
var env = {};

// Import variables if present from env.js
if (window) {
    Object.assign(env, window.__env);
}

var app = angular
    .module('angularjsTsiPbiApp', ['ngRoute', 'AdalAngular'])
    .constant('__env', env);

app.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', 'adalAuthenticationServiceProvider', 
    function($routeProvider, $httpProvider, adalProviderTSI, adalProviderPBI) {
        //// using '!' as the hashPrefix but can be a character of your choosing
        //$locationProvider.html5Mode(true).hashPrefix('!');
        $routeProvider.when("/embed", {
            controller: "embedController",
            templateUrl: "views/embed.html",
            requireADLogin: true
        });

        $routeProvider.otherwise({redirectTo: "."});

        adalProviderTSI.init({
            clientId: __env.tsiClientId, 
            endpoints: {
                    [__env.tsiEndpoint]: [__env.tsiEndpoint],
                },
            },
            $httpProvider   // pass http provider to inject request interceptor to attach tokens
        );
        adalProviderPBI.init({
            clientId: __env.pbiClientId, 
            endpoints: {
                    [__env.pbiEndpoint]: [__env.pbiEndpoint],
                },
            },
            $httpProvider   // pass http provider to inject request interceptor to attach tokens
        );
}]);
