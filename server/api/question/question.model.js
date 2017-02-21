'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  title: String,
  content: String,
  hasBest: {
    type: Boolean,
    default: false,
  },
  answers: [{
    content: String,
    best: {
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
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }],
    upvotes: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    downvotes: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    votecount: {
      type: Number,
      default: 0,
    },
  }],
  tags: [{
    _id: false,
    text: String,
  }],
  views: {
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
  upvotes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  votecount: {
    type: Number,
    default: 0,
  },
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
