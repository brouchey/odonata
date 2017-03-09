'use strict';

describe('Component: QuizIndexComponent', function() {
  // load the controller's module
  beforeEach(module('odonataApp.quizIndex'));

  var QuizIndexComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    QuizIndexComponent = $componentController('quizIndex', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
