'use strict';

var express = require('express');
var controller = require('./question.controller');

var router = express.Router();

var auth = require('../../auth/auth.service');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.post('/:id/comments', auth.isAuthenticated(), controller.createComment);
router.put('/:id/comments/:commentId', auth.isAuthenticated(), controller.updateComment);
router.delete('/:id/comments/:commentId', auth.isAuthenticated(), controller.destroyComment);

router.post('/:id/answers', auth.isAuthenticated(), controller.createAnswer);
router.put('/:id/answers/:answerId', auth.isAuthenticated(), controller.updateAnswer);
router.delete('/:id/answers/:answerId', auth.isAuthenticated(), controller.destroyAnswer);

router.post('/:id/answers/:answerId/comments', auth.isAuthenticated(), controller.createAnswerComment);
router.put('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.updateAnswerComment);
router.delete('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.destroyAnswerComment);

router.put('/:id/star', auth.isAuthenticated(), controller.star);
router.delete('/:id/star', auth.isAuthenticated(), controller.unstar);

router.get('/user/:userId', auth.isAuthenticated(), controller.showUserQuestions);
router.get('/user/:userId/favorites', auth.isAuthenticated(), controller.showUserFavoritesQuestions);

router.get('/search/:keyword', auth.isAuthenticated(), controller.searchQuestions);

router.get('/scroll/:lastId', controller.scrollNextQuestions);

router.get('/tags/all', controller.showAllTags);

router.put('/:id/voteUp', auth.isAuthenticated(), controller.voteUp);
router.delete('/:id/voteUp', auth.isAuthenticated(), controller.unvoteUp);
router.put('/:id/voteDown', auth.isAuthenticated(), controller.voteDown);
router.delete('/:id/voteDown', auth.isAuthenticated(), controller.unvoteDown);
router.put('/:id/answers/:answerId/voteUp', auth.isAuthenticated(), controller.voteUpAnswer);
router.delete('/:id/answers/:answerId/voteUp', auth.isAuthenticated(), controller.unvoteUpAnswer);
router.put('/:id/answers/:answerId/voteDown', auth.isAuthenticated(), controller.voteDownAnswer);
router.delete('/:id/answers/:answerId/voteDown', auth.isAuthenticated(), controller.unvoteDownAnswer);

router.put('/:id/answers/:answerId/bestAnswer', auth.isAuthenticated(), controller.bestAnswer);

router.put('/:id/incViews', controller.incViews);

module.exports = router;
