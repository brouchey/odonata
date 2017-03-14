'use strict';

describe('Component: CourseShowComponent', function() {
  // load the controller's module
  beforeEach(module('odonataApp.courseShow'));

  var CourseShowComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CourseShowComponent = $componentController('courseShow', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
