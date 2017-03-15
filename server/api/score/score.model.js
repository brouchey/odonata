'use strict';

import mongoose from 'mongoose';

var ScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  score: {
  	total: {
      type: Number,
      default: 0,
    }, 
  	courses: {
      type: Number,
      default: 0,
    }, 
  	questions: {
      type: Number,
      default: 0,
    },
    answers: {
      type: Number,
      default: 0,
    },
  	quizzes: {
      type: Number,
      default: 0,
    }, 
  },
});

ScoreSchema.pre('find', function(next) {
  this.populate('user', 'name');
  next();
});
ScoreSchema.pre('findOne', function(next) {
  this.populate('user', 'name');
  next();
});

export default mongoose.model('Score', ScoreSchema);
