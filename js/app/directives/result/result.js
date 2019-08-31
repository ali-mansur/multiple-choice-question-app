angular.module('MCQ').directive("result",function (ExamService) {

    return {

      	templateUrl: "./js/app/directives/result/result.html",
        restrict: 'E',
        scope: {
          questions: "="
        },

        controller: function($scope, $element, $attrs) {  
            
            $scope.exitExam = function() {
                $scope.$emit('exam.exit');
            }

            $scope.chartConfig = ExamService.getChartConfig($scope.questions);
        }
    }
  });