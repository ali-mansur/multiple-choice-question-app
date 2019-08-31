var app = angular.module('MCQ', ['highcharts-ng']);

app.controller('mcqController', function($scope, ExamService, $interval) {
    ExamService.setExamTimeInSeconds(300);
    $scope.exam = ExamService.getExamOfQuestions(10);
    

    $scope.$on('exam.started', function(){
        var promise = $interval(function(){
            if($scope.exam.isStarted && !$scope.exam.isSubmitted && $scope.exam.timeLeft > 0){
                $scope.exam.timeLeft = $scope.exam.timeLeft - 1;
                $scope.exam.formattedTimeLeft = parseInt($scope.exam.timeLeft/60) + ' Mins ' + ($scope.exam.timeLeft%60) + ' Seconds';
            }else {
                $interval.cancel(promise)
                $scope.$broadcast('exam.submit')
            }
        }, 1000)
    });

    $scope.$on('exam.exit', function(){
        $scope.exam = ExamService.getExamOfQuestions();
    })
});