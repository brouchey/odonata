'use strict';

describe('Component: QuestionsIndexComponent', function() {
  // load the controller's module
  beforeEach(module('odonataApp.questionsIndex'));

  var QuestionsIndexComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    QuestionsIndexComponent = $componentController('questionsIndex', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
