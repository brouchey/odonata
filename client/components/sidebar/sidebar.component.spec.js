'use strict';

describe('Component: sidebar', function() {
  // load the component's module
  beforeEach(module('odonataApp.sidebar'));

  var sidebarComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    sidebarComponent = $componentController('sidebar', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
