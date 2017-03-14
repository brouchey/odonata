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
import 'ng-file-upload';
// import 'ng-infinite-scroll';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import home from './home/home.controller';
import main from './home/main/main.component';
import portal from './home/portal/portal.component';
// import sidebar from '../components/sidebar/sidebar.component';
import adminSidebar from '../components/admin-sidebar/admin-sidebar.component';
import portalSidebar from '../components/portal-sidebar/portal-sidebar.component';
import profileSidebar from '../components/profile-sidebar/profile-sidebar.component';
import footer from '../components/footer/footer.component';
import courseIndex from './library/courseIndex/courseIndex.component';
import courseCreate from './library/courseCreate/courseCreate.component';
import courseShow from './library/courseShow/courseShow.component';
import questionsIndex from './exchange/questionsIndex/questionsIndex.component';
import questionsCreate from './exchange/questionsCreate/questionsCreate.component';
import questionsShow from './exchange/questionsShow/questionsShow.component';
import quizIndex from './quizbox/quizIndex/quizIndex.component';
import quizCreate from './quizbox/quizCreate/quizCreate.component';
import quizShow from './quizbox/quizShow/quizShow.component';
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
  'ngFileUpload',
  'ngTagsInput',
  // 'infinite-scroll',
  _Auth,
  account,
  admin,
  navbar,
  home,
  main,
  portal,
  // sidebar,
  adminSidebar,
  portalSidebar,
  profileSidebar,
  footer,
  courseIndex,
  courseCreate,
  courseShow,
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
