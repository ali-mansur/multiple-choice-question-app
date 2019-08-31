angular.module('MCQ').directive("questions",function () {

    return {

      	templateUrl: "./js/app/directives/questions/questions.html",
        restrict: 'E',
        scope: {
          questions: "=",
          examSubmitted: "=",
          timeLeft: "@"
        },

        controller: function($scope, $element, $attrs) { 
          
          $scope.currentQIndex = 0;
          $scope.currentQ = {};
          $scope.qNeedsToBeAnswered = undefined;

          $scope.submitExam = function(isTimeup) {
            if(isTimeup) {
              $scope.examSubmitted = true;
              return;
            }
            var r = confirm("Are you sure you wanna submit!");
            if (r == true) {
                // check if all questions answwered if not open up that question to answer
                $scope.qNeedsToBeAnswered = getQIndexNotAnswered($scope.questions);
                if($scope.qNeedsToBeAnswered != undefined) {
                    $scope.goToQ($scope.qNeedsToBeAnswered)
                } else {
                    console.log('submit exam and show results');
                    $scope.examSubmitted = true;
                }
            }   
          }

          $scope.goToQ = function(qIndex) {
            $scope.currentQIndex = qIndex;
            $scope.currentQ = $scope.questions[qIndex];
          }

          $scope.markAnswer = function(qNo, answer) {
            $scope.questions[qNo].as = $scope.questions[qNo].as !== answer ? answer : '';
          }
          
          function getQIndexNotAnswered(questions) {
            var qIndex = undefined, i;
            for( i = 0; i < questions.length; i++ ) {
                 if(!questions[i].as) {
                     qIndex = i;
                     break;
                 }
            }
            return qIndex;
          }

          $scope.goToQ(0);

          $scope.$on('exam.submit', function(){
            $scope.submitExam(true)
          });
        }
    }
  });