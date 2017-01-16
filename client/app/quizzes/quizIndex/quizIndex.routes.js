'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/quiz', {
      template: '<quiz-index></quiz-index>'
    });
}
