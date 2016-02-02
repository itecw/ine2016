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

	$scope.questions = [
		{
			id: 'q1',
			qn: 'What does I&E day stand for?',
			opts: [
				{
					val: 'A',
					ans: 'Innovation & Enterprise Day',
					correctAns: true
				},
				{
					val: 'B',
					ans: 'Innovation & Entertainment Day',
					correctAns: false
				},
				{
					val: 'C',
					ans: 'Innovation & Education Day',
					correctAns: false
				},
				{
					val: 'D',
					ans: 'Innovation & Environment Day',
					correctAns: false
				}
			]
		},
		{
			id: 'q2',
			qn: 'How many SEIT students went for overseas industrial attachment in Taiwan in 2015?',
			opts: [
				{
					val: 'A',
					ans: '7',
					correctAns: false
				},
				{
					val: 'B',
					ans: '8',
					correctAns: true
				},
				{
					val: 'C',
					ans: '9',
					correctAns: false
				},
				{
					val: 'D',
					ans: '10',
					correctAns: false
				}
			]
		},
		{
			id: 'q3',
			qn: 'What is the maximum amount that ITE will fund each student for Enterprise Fund project?',
			opts: [
				{
					val: 'A',
					ans: '$1000',
					correctAns: false
				},
				{
					val: 'B',
					ans: '$2000',
					correctAns: false
				},
				{
					val: 'C',
					ans: '$3000',
					correctAns: true
				},
				{
					val: 'D',
					ans: '$4000',
					correctAns: false
				}
			]
		},
		{
			id: 'q4',
			qn: 'Which of the following is NOT a basic ingredient that is required for beer brewing?',
			opts: [
				{
					val: 'A',
					ans: 'Grape Juice',
					correctAns: true
				},
				{
					val: 'B',
					ans: 'Malted Barley',
					correctAns: false
				},
				{
					val: 'C',
					ans: 'Water',
					correctAns: false
				},
				{
					val: 'D',
					ans: 'Yeast',
					correctAns: false
				}
			]
		}
	];
	
	$scope.optIndex = function (index) {
		return String.fromCharCode('a'.charCodeAt() + index);	// returns a, b, c, ...
	}

	function resetAnswers() {
		$scope.answers = [];
		$scope.correctAns = [];
		for (var i=0; i<$scope.questions.length; i++) {
			$scope.answers.push(null);
			
			for (var j=0; j<$scope.questions[i].opts.length; j++) {
				if ($scope.questions[i].opts[j].correctAns)
					$scope.correctAns.push($scope.questions[i].opts[j].val);
			}
		}
	}
	resetAnswers();							// reset form
	
	console.log('Correct answers = ', $scope.correctAns);

	$scope.minCorrectAns = $scope.questions.length - 1;		// only 1 wrong answer allowed
		
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
		
		if ($scope.numCorrectAns >= $scope.minCorrectAns) {
			resetAnswers(); 			// reset form
		}
		
		$state.go('result');
    };

	$scope.back = function() {
		$state.go('index');
	};

});
