'use strict';

describe('Service: sidebar', function() {
  // load the service's module
  beforeEach(module('odonataApp.sidebar'));

  // instantiate service
  var sidebar;
  beforeEach(inject(function(_sidebar_) {
    sidebar = _sidebar_;
  }));

  it('should do something', function() {
    expect(!!sidebar).toBe(true);
  });
});
