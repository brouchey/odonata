'use strict';

describe('Component: QuizCreateComponent', function() {
  // load the controller's module
  beforeEach(module('odonataApp.quizCreate'));

  var QuizCreateComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    QuizCreateComponent = $componentController('quizCreate', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
