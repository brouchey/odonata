'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  title: String,
  content: String,
  answers: [{
    content: String,
    votes: {
      type: Number,
      default: 0,
    },
    correct: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments: [{
      content: String,
      stars: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }],
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }],
    stars: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
  }],
  tags: [{
    text: String,
  }],
  views: {
    type: Number,
    default: 0,
  },
  votes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{
    content: String,
    stars: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  stars: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
});

QuestionSchema.pre('find', function(next) {
  this.populate('user', 'name');
  this.populate('comments.user', 'name');
  this.populate('answers.user', 'name');
  this.populate('answers.comments.user', 'name');
  next();
});
QuestionSchema.pre('findOne', function(next) {
  this.populate('user', 'name');
  this.populate('comments.user', 'name');
  this.populate('answers.user', 'name');
  this.populate('answers.comments.user', 'name');
  next();
});

QuestionSchema.index({
  'title': 'text',
  'content': 'text',
  'tags.text': 'text',
  'answers.content': 'text',
  'comments.content': 'text',
  'answers.comments.content': 'text',
}, {name: 'question_schema_index'});

export default mongoose.model('Question', QuestionSchema);
