/**
 * Course model events
 */

'use strict';

import {EventEmitter} from 'events';
import Course from './course.model';
var CourseEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CourseEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Course.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CourseEvents.emit(event + ':' + doc._id, doc);
    CourseEvents.emit(event, doc);
  };
}

export default CourseEvents;
