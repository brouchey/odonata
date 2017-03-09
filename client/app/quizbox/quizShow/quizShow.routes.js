'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/quiz/show/:id', {
      template: '<quiz-show></quiz-show>',
      authenticate: 'user'
    });
}
