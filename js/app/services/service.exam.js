angular.module('MCQ').service('ExamService', function(){
    
    function getInstructions () {
        return [
            "all questions are mandatory to answer",
            "There is only 1 correct answer for the given questions",
            "To select the right answer click on the options given",
            "If you wanna reset an answer click again on the previously selected option",
            "On submit if you haven't answer a question you will be taken to that question to answer",
            "Once you submit the exam, you will see a Pie chart showing correct and wrong answers",
            "You can find out all right questions for these questions using this logic. Do Mod (%) operation to the question number, reminder would be the right answer. if mod is 0 then option 4 would be the right answer. For Example for Q-1  1 % 4 = 1 option, Q-6   6 % 4 = 2 option, Q-11  11 % 4 = 3 option and for Q-12  12 % 4 = 0 then the answer would be option 4"
        ];
    }
    // q is for Question, a is for Answer as is for Answer selected
    function getQuestions (noOfQ) {
        var i = 1, question={}, questions = [];
        while( i <= noOfQ ) {
            question = {
                q: "what's the question " + i,
                a: 'option-' + (i % 4 !== 0 ? i % 4 : 4),
                as: '',
                options: ['option-1', 'option-2', 'option-3', 'option-4'],
            }
            questions.push(question);
            i++;
        }
        
        return questions;
    }

    var exam = {
        name: 'MCQ Exam',
        isStarted: false,
        isSubmitted: false,
        timeLeft: 10,
        questions: getQuestions(5),
        instruction: getInstructions()
    }

    this.getExamOfQuestions = function(noOfQ) {
        var newExam = Object.assign({}, exam);
        if(noOfQ) {
            newExam.questions = getQuestions(noOfQ);
        }

        return newExam;
    }

    this.setExamTimeInSeconds = function(ExamTimeInSeconds) {
        exam.timeLeft = parseInt(ExamTimeInSeconds)
    }

    var chartConfig = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Point scored'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
            name: 'Answers',
            colorByPoint: true,
            data: []
        }]
    }

    function plotResutls(questions) {
        var righAnswer = 0, wrongAnswer = 0;
        questions.forEach(function(question){
            if(question.as === question.a) {
                righAnswer++;
            } else {
                wrongAnswer++;
            }
        })
        return [
            {
                name: 'Correct answers',
                y: righAnswer,
                sliced: true,
                selected: true
            },
            {
                name: 'Wrong answers',
                y: wrongAnswer
            }
        ]
    }

    this.getChartConfig = function(questions) {
        if(questions.length) {
            chartConfig.series[0].data = plotResutls(questions);
        }

        return chartConfig;
    }
});