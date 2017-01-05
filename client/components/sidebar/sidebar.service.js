'use strict';
const angular = require('angular');

/*@ngInject*/
export function sidebarToggle() {
		this.isCollapsedHorizontal = false;
  };
}

export default angular.module('odonataApp.sidebar', [])
  .service('sidebarToggle', sidebarToggle)
  .name;

