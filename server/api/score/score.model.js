'use strict';

import mongoose from 'mongoose';

var ScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  total: {
    type: Number,
    default: 0,
  },
  points: {
    Courses: {
      type: Number,
      default: 0,
    }, 
    Questions: {
      type: Number,
      default: 0,
    },
    Answers: {
      type: Number,
      default: 0,
    },
    Quizzes: {
      type: Number,
      default: 0,
    },
  }
});

export default mongoose.model('Score', ScoreSchema);
