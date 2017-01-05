'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/questions', {
      template: '<questions-index></questions-index>'
    });
}
