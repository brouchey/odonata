'use strict';

import home from './home.component';
import {
  MainController
} from './home.component';

describe('Component: MainController', function() {
  beforeEach(angular.mock.module(home));
  beforeEach(angular.mock.module('socketMock'));

  var scope;
  var homeComponent;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, socket) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    homeComponent = $componentController('home', {
      $http,
      $scope: scope,
      socket
    });
  }));

  it('should attach a list of things to the controller', function() {
    homeComponent.$onInit();
    $httpBackend.flush();
    expect(homeComponent.awesomeThings.length)
      .toBe(4);
  });
});
