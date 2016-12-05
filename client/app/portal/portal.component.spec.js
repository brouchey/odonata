'use strict';

describe('Component: PortalComponent', function() {
  // load the controller's module
  beforeEach(module('odonataApp.portal'));

  var PortalComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PortalComponent = $componentController('portal', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
