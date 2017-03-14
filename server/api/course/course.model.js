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

export default mongoose.model('Course', CourseSchema);
