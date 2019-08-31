angular.module('MCQ').directive("instruction",function () {

    return {

      	templateUrl: "./js/app/directives/instruction/instruction.html",
        restrict: 'E',
        scope: {
          instruction: "=",
          examStarted: "=",
          examName: '@'
        },

        controller: function($scope, $element, $attrs) {  
          $scope.startExam = function() {
            $scope.examStarted = true;
            $scope.$emit('exam.started');
          }
        }
    }
  });