'use strict';

import mongoose from 'mongoose';

var CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  tags: [{
    _id: false,
    text: String,
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

CourseSchema.pre('find', function(next) {
  this.populate('user', 'name');
  next();
});
CourseSchema.pre('findOne', function(next) {
  this.populate('user', 'name');
  next();
});

CourseSchema.index({
  'title': 'text',
  'description': 'text',
  'content': 'text',
  'tags.text': 'text',
}, {name: 'course_schema_index'});

export default mongoose.model('Course', CourseSchema);
