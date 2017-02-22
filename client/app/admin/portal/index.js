'use strict';

import angular from 'angular';
import AdminPortalController from './portal.controller';

export default angular.module('odonataApp.portal', [])
  .controller('AdminPortalController', AdminPortalController)
  .name;
