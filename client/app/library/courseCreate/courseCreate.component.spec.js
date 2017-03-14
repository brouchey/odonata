'use strict';

describe('Component: CourseCreateComponent', function() {
  // load the controller's module
  beforeEach(module('odonataApp.courseCreate'));

  var CourseCreateComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CourseCreateComponent = $componentController('courseCreate', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
