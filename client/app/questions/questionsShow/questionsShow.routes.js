'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/questions/show/:id', {
      template: '<questions-show></questions-show>'
    });
}
