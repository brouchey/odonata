'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/quiz/create', {
      template: '<quiz-create></quiz-create>',
      authenticate: 'user'
    });
}
