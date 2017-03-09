'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/exchange/show/:id', {
      template: '<questions-show></questions-show>'
    });
}
