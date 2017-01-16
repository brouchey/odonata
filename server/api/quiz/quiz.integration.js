'use strict';

var app = require('../..');
import request from 'supertest';

var newQuiz;

describe('Quiz API:', function() {
  describe('GET /api/quiz', function() {
    var quizs;

    beforeEach(function(done) {
      request(app)
        .get('/api/quiz')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          quizs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      quizs.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/quiz', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/quiz')
        .send({
          name: 'New Quiz',
          info: 'This is the brand new quiz!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQuiz = res.body;
          done();
        });
    });

    it('should respond with the newly created quiz', function() {
      newQuiz.name.should.equal('New Quiz');
      newQuiz.info.should.equal('This is the brand new quiz!!!');
    });
  });

  describe('GET /api/quiz/:id', function() {
    var quiz;

    beforeEach(function(done) {
      request(app)
        .get(`/api/quiz/${newQuiz._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          quiz = res.body;
          done();
        });
    });

    afterEach(function() {
      quiz = {};
    });

    it('should respond with the requested quiz', function() {
      quiz.name.should.equal('New Quiz');
      quiz.info.should.equal('This is the brand new quiz!!!');
    });
  });

  describe('PUT /api/quiz/:id', function() {
    var updatedQuiz;

    beforeEach(function(done) {
      request(app)
        .put(`/api/quiz/${newQuiz._id}`)
        .send({
          name: 'Updated Quiz',
          info: 'This is the updated quiz!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQuiz = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQuiz = {};
    });

    it('should respond with the original quiz', function() {
      updatedQuiz.name.should.equal('New Quiz');
      updatedQuiz.info.should.equal('This is the brand new quiz!!!');
    });

    it('should respond with the updated quiz on a subsequent GET', function(done) {
      request(app)
        .get(`/api/quiz/${newQuiz._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let quiz = res.body;

          quiz.name.should.equal('Updated Quiz');
          quiz.info.should.equal('This is the updated quiz!!!');

          done();
        });
    });
  });

  describe('PATCH /api/quiz/:id', function() {
    var patchedQuiz;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/quiz/${newQuiz._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Quiz' },
          { op: 'replace', path: '/info', value: 'This is the patched quiz!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQuiz = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQuiz = {};
    });

    it('should respond with the patched quiz', function() {
      patchedQuiz.name.should.equal('Patched Quiz');
      patchedQuiz.info.should.equal('This is the patched quiz!!!');
    });
  });

  describe('DELETE /api/quiz/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/quiz/${newQuiz._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when quiz does not exist', function(done) {
      request(app)
        .delete(`/api/quiz/${newQuiz._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
