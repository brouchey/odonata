'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/exchange', {
      template: '<questions-index></questions-index>'
    });
}
