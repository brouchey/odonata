'use strict';

import angular from 'angular';
import AdminController from './admin.controller';

export default angular.module('odonataApp.portal', [])
  .controller('AdminController', AdminController)
  .name;
