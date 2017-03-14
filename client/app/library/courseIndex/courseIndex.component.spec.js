'use strict';

describe('Component: CourseIndexComponent', function() {
  // load the controller's module
  beforeEach(module('odonataApp.courseIndex'));

  var CourseIndexComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CourseIndexComponent = $componentController('courseIndex', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
