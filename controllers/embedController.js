'use strict';
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addHours = function(hours) {    
   var date = new Date(this.valueOf());
   date.setTime(date.getTime() + (hours*60*60*1000)); 
   return date;   
}

app.controller("embedController", ['$scope', '$interval', 'adalAuthenticationService', 'adalAuthenticationService', '__env', 
    function ($scope, $interval, adalServiceTSI, adalServicePBI, env) {
        $scope.pastNDays = env.staticPastNDays;
        $scope.pastNHours = env.realtimePastNHours;
        $scope.stopAfterNRefreshes = env.stopsAfterNRefreshes;
        $scope.init = function () {
            adalServiceTSI.acquireToken(env.tsiEndpoint).then(function (token) {
                console.log(token);
                var tsiClient = new TsiClient();
                var tsienv = env.tsiEnv; 
            
                var now = new Date();
                var startDate = now.addDays(0-$scope.pastNDays);
                var endDate = now;

                //query tsi for the first static chart
                var aggregateExpressions2 = [];
                aggregateExpressions2.push(new tsiClient.ux.AggregateExpression({predicateString:""}, {property: __env.tsiMetric1, type: "Double"}, ['avg', 'min', 'max'],
                    { from: startDate, to: endDate, bucketSize: '10s' }, null, 'red', __env.tsiMetric1));
                aggregateExpressions2.push(new tsiClient.ux.AggregateExpression({predicateString:""}, {property: __env.tsiMetric2, type: "Double"}, ['avg', 'min', 'max'],
                    { from: startDate, to: endDate, bucketSize: '10s' }, null, 'green', __env.tsiMetric1));

                tsiClient.server.getAggregates(token, tsienv, aggregateExpressions2.map(function(ae){return ae.toTsx()})).then(function(result){
                    var transformedResult = tsiClient.ux.transformAggregatesForVisualization(result, aggregateExpressions2);
                    var lineChart = new tsiClient.ux.LineChart(angular.element(chart1)[0]);
                    //var lineChart = new tsiClient.ux.LineChart(document.getElementById('chart1'));
                    var theme = 'light';
                    lineChart.render(transformedResult, {theme: theme, grid: true, tooltip: true}, aggregateExpressions2);
                });

                //query tsi for the second real time chart
                var startDate2 = now.addHours(0-$scope.pastNHours);
                var endDate2 = now;
                var aggregateExpressions6 = [];
                aggregateExpressions6.push(new tsiClient.ux.AggregateExpression({predicateString: ""}, {property: __env.tsiMetric2, type: "Double"}, ['avg', 'min', 'max'],
                    { from: startDate2, to: endDate2, bucketSize: '10s' }, null, 'yellow', __env.tsiMetric2));
                tsiClient.server.getAggregates(token, tsienv, aggregateExpressions6.map(function(ae){return ae.toTsx()})).then(function(result){
                    var transformedResult = tsiClient.ux.transformAggregatesForVisualization(result, aggregateExpressions6);
                    var lineChart = new tsiClient.ux.LineChart(angular.element(chart2)[0]);
                    lineChart.render(transformedResult, {}, aggregateExpressions6);
                    var counter = 0;
                    $interval(function () {
                        if(counter < $scope.stopAfterNRefreshes){  // so this doesnt just DDOS the backend if the tab is left open
                            startDate2 = new Date(startDate2.valueOf() + 1*1000*10);
                            endDate2 = new Date(endDate2.valueOf() + 1*1000*10);
                            aggregateExpressions6.forEach(function(ae){ae.searchSpan.from = startDate2; ae.searchSpan.to = endDate2});
                            tsiClient.server.getAggregates(token, tsienv, aggregateExpressions6.map(function(ae){return ae.toTsx()})).then(function(result){
                                var transformedResult = tsiClient.ux.transformAggregatesForVisualization(result, aggregateExpressions6);
                                lineChart.render(transformedResult, {noAnimate: true}, aggregateExpressions6);
                            });
                            counter++;
                        }
                    }, 10000);                    
                });
            }, function(error) {
                console.log('failed to acquire tsi token: ' + error);
            });


            //embed Power BI reports
            adalServicePBI.acquireToken(env.pbiEndpoint).then(function (token) {
                var models = window['powerbi-client'].models;
                var config = {
                    type: 'report',
                    tokenType: models.TokenType.Aad,
                    accessToken: token,
                    embedUrl: __env.pbiReportEmbedUrl
                };
                var reportContainer = angular.element(pbireport1)[0];
                powerbi.embed(reportContainer, config);
            }, function(error) {
                console.log('failed to acquire pbi token: ' + error);
            });
        };

        $scope.init();
}]);