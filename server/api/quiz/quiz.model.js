'use strict';

import mongoose from 'mongoose';

var QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [{
    content: String,
    options: [{
      text: String,
    }],
    answer: String,
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

QuizSchema.pre('find', function(next){
  this.populate('user', 'name');
  next();
});
QuizSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  next();
});

export default mongoose.model('Quiz', QuizSchema);
