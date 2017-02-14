'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngMessages from 'angular-messages';
import ngValidationMatch from 'angular-validation-match';
import 'angular-socket-io';
const ngRoute = require('angular-route');
import uiBootstrap from 'angular-ui-bootstrap';
import 'ng-tags-input';
// import 'ng-infinite-scroll';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
// import sidebar from '../components/sidebar/sidebar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import dashboard from './dashboard/dashboard.component';
import questionsIndex from './questions/questionsIndex/questionsIndex.component';
import questionsCreate from './questions/questionsCreate/questionsCreate.component';
import questionsShow from './questions/questionsShow/questionsShow.component';
import quizIndex from './quizzes/quizIndex/quizIndex.component';
import quizCreate from './quizzes/quizCreate/quizCreate.component';
import quizShow from './quizzes/quizShow/quizShow.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.scss';

angular.module('odonataApp', [
  ngAnimate,
  ngCookies,
  ngResource,
  ngSanitize,
  ngMessages,
  ngValidationMatch,
  'btford.socket-io',
  ngRoute,
  uiBootstrap,
  'ngTagsInput',
  // 'infinite-scroll',
  _Auth,
  account,
  admin,
  navbar,
  // sidebar,
  footer,
  main,
  dashboard,
  questionsIndex,
  questionsCreate,
  questionsShow,
  quizIndex,
  quizCreate,
  quizShow,
  constants,
  socket,
  util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['odonataApp'], {
      strictDi: true
    });
  });
