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
    this.quizProgress = (((this.id+1)/this.quiz.questions.length)*100).toFixed(0);
    var q = this.quiz.questions[this.id];
    if(q) {
      this.ofType = q.ofType;
      if(this.ofType === 'FTB') {
        this.question = q.content.replace(q.answer, '_____'); // replace word to find
      } else {
        this.question = q.content;
      }
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
    if(this.selectedOption) {
      delete this.selectedOption; // delete user answer to avoid automatic checkAnswer on next question
    };
    this.getQuestion();
  }
  
  // compare user answer with correct answer
  checkAnswer() {
    if(!this.selectedOption) {
      return;
    } else {
      if(this.selectedOption.toLowerCase() == this.answer.toLowerCase()) {
        this.score++;
        this.correctAns = true;
    } else {
        this.correctAns = false;
    }
    this.answerMode = false;  // display options and result in HTML
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
