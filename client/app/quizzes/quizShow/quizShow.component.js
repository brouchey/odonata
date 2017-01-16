'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './quizShow.routes';

export class QuizShowComponent {
  $http;
  $routeParams;
  quiz = {};

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
        console.log('loadQuiz');
        console.log(this.quiz);
      });
  }

  startQuiz() {
    this.id = 0; // ID of current question
    this.quizOver = false;
    this.inProgress = true;
    this.getQuestion();
  };

  resetQuiz() {
    this.inProgress = false;
    // score = 0;
  }

  getQuestion() {
    var q = this.getQuestion(id);
    if(this.quiz) {
      question = this.quiz.question;
      options = this.quiz.options;
      answer = this.quiz.answer;
      // answerMode display the options or the result of current question accordingly
      this.answerMode = true;
    } else {
      this.quizOver = true;
    }
  };
  
  // compare the selected option with the correct answer
  checkAnswer() {
    if(!$('input[name=answer]:checked').length) return;

    var ans = $('input[name=answer]:checked').val();

    if(ans == options[answer]) {
      // score++;
      correctAns = true;
    } else {
      correctAns = false;
    }

    // answerMode display the options or the result of current question accordingly
    answerMode = false;
  };

  // get next question when user clicks next
  nextQuestion() {
    id++;
    this.getQuestion();
  }

  getQuestion(id) {
      if(id < questions.length) {
        return questions[id];
      } else {
        return false;
      }
    }

}

export default angular.module('odonataApp.quizShow', [ngRoute])
  .config(routes)
  .component('quizShow', {
    template: require('./quizShow.pug'),
    controller: QuizShowComponent,
    controllerAs: 'vm'
  })
  .name;
