var app = angular.module('myApp', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	  .state('index', {
		url: '/',
		templateUrl: 'quiz.html'
	  })
	  .state('result', {
		url: '/result',
		templateUrl: 'result.html'
	  });
	  
	$urlRouterProvider.otherwise('/');  
});
 
app.controller('MainCtrl', function($scope, $state, $ionicPopup) {

	$scope.answers = [null, null, null]; 			// Initialize model here
	$scope.correctAns = ['A', 'B', 'C'];
		
	$scope.computeResult = function () {
		console.log($scope.answers);
		
		$scope.numCorrectAns = 0;
		for (var i=0; i<$scope.answers.length; i++) {
			if ($scope.answers[i] == null) {
				//console.log('Please answer all the questions');
				var alertPopup = $ionicPopup.alert({
					title: 'Incomplete',
					template: 'Please answer all the questions.'
				});
				return;
			} else {
				if ($scope.answers[i] == $scope.correctAns[i])
					$scope.numCorrectAns++;
			}
		}
		
		console.log('Num of correct answers = ' + $scope.numCorrectAns);
		//$scope.answers = [null, null, null]; 	// reset form
		$state.go('result');
    };

	$scope.back = function() {
		$state.go('index');
	};

});
