'use strict';

import angular from 'angular';
const ngRoute = require('angular-route');

import routing from './account.routes';
import login from './login';
import settings from './settings';
import profile from './profile';
import signup from './signup';
import oauthButtons from '../../components/oauth-buttons';

export default angular.module('odonataApp.account', [ngRoute, login, settings, profile, signup, oauthButtons])
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
