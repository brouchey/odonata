'use strict';

import mongoose from 'mongoose';

var QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [{
    ofType: String,
    content: String,
    options: [String],
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
