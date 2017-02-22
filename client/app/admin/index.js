'use strict';

import angular from 'angular';
const ngRoute = require('angular-route');

import routing from './admin.routes';
import portal from './portal';
import feed from './feed';
import logs from './logs';
import users from './users';

export default angular.module('odonataApp.admin', ['odonataApp.auth', ngRoute, portal, feed, logs, users])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if(next.name === 'logout' && current && current.originalPath && !current.authenticate) {
        next.referrer = current.originalPath;
      }
    });
  })
  .name;
