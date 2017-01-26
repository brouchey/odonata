'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './quizShow.routes';

export class QuizShowComponent {
  $http;
  $routeParams;
  quiz = {};
  id = 0;
  score = 0;

  /*@ngInject*/
  constructor($scope, $http, $routeParams) {
    this.$scope = $scope;
    this.$http = $http;
    this.$routeParams = $routeParams;
  }

  $onInit() {
    this.loadQuiz();
    this.resetQuiz();
  }

  loadQuiz() {
    this.$http.get('/api/quiz/' + this.$routeParams.id)
      .then(response => {
        this.quiz = response.data;
      });
  }

  startQuiz() {
    this.id = 0; // current question ID
    this.quizOver = false;
    this.inProgress = true;
    this.getQuestion();
  };

  resetQuiz() {
    this.inProgress = false;
    this.score = 0;
  }

  getQuestion() {
    var q = this.quiz.questions[this.id]
    if(q) {
      this.question = q.content;
      this.ofType = q.ofType;
      this.options = q.options;
      this.answer = q.answer;
      this.answerMode = true; // display options and result in HTML
    } else {
      this.quizOver = true;
      this.scorePercent = ((this.score/this.quiz.questions.length)*100).toFixed(0);
    }
  };

  nextQuestion() {
    this.id++;
    this.getQuestion();
  }
  
  // compare user answer with correct answer
  checkAnswer() {
    // if(!$('input[name=answer]:checked').length) return; // jQuery
    // var ans = $('input[name=answer]:checked').val(); // jQuery
    if(!this.selectedOption) {
      return;
    } else {
      if(this.selectedOption == this.answer) {
        this.score++;
        this.correctAns = true;
    } else {
        this.correctAns = false;
    }
    this.answerMode = false;  // display options and result in HTML
    delete this.selectedOption; // delete user answer to avoid automatic checkAnswer for next question
    }
  };

}

export default angular.module('odonataApp.quizShow', [ngRoute])
  .config(routes)
  .component('quizShow', {
    template: require('./quizShow.pug'),
    controller: QuizShowComponent,
    controllerAs: 'vm'
  })
  .name;
