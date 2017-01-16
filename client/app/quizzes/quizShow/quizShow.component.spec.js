'use strict';

describe('Component: QuizShowComponent', function() {
  // load the controller's module
  beforeEach(module('odonataApp.quizShow'));

  var QuizShowComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    QuizShowComponent = $componentController('quizShow', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
