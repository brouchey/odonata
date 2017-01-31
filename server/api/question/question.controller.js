/*
 * Using Rails-like standard naming convention for endpoints.
 * Questions :
 * GET     /api/questions              ->  index
 * POST    /api/questions              ->  create
 * GET     /api/questions/:id          ->  show
 * PUT     /api/questions/:id          ->  upsert
 * PATCH   /api/questions/:id          ->  patch
 * DELETE  /api/questions/:id          ->  destroy
 *
 * Question Comments :
 * POST    /api/questions/:id/comments              ->  createComment
 * PUT     /api/questions/:id/comments/:commentId   ->  updateComment
 * DELETE  /api/questions/:id/comments/:commentId   ->  destroyComment
 *
 * Answers :
 * POST    /api/questions/:id/answers                 ->  createAnswer
 * PUT     /api/questions/:id/answers/:answerId       ->  updateAnswer
 * DELETE  /api/questions/:id/answers/:answerId       ->  destroyAnswer
 *
 * Answer Comments :
 * POST    /api/questions/:id/answers/:answerId/comments              ->  createAnswerComment
 * PUT     /api/questions/:id/answers/:answerId/comments/:commentId   ->  updateAnswerComment
 * DELETE  /api/questions/:id/answers/:answerId/comments/:commentId   ->  destroyAnswerComment
 *
 * Star/Unstar :
 * PUT     /api/questions/:id/star                                        -> star
 * DELETE  /api/questions/:id/star                                        -> unstar
 * PUT     /api/questions/:id/answers/:answerId/star                      -> starAnswer
 * DELETE  /api/questions/:id/answers/:answerId/star                      -> unstarAnswer
 * PUT     /api/questions/:id/comments/:commentId/star                    -> starComment
 * DELETE  /api/questions/:id/comments/:commentId/star                    -> unstarComment
 * PUT     /api/questions/:id/answers/:answerId/comments/:commentId/star  -> starAnswerComment
 * DELETE  /api/questions/:id/answers/:answerId/comments/:commentId/star  -> unstarAnswerComment
 * 
 * User Questions and Starred :
 * GET     /api/questions/users/:userId             ->  showUserQuestions
 * GET     /api/questions/users/:userId/favorites   ->  showUserFavoritesQuestions
 * 
 * Search Questions :
 * GET     /api/questions/:keyword   ->  searchQuestions
 * 
 * Scroll Questions :
 * GET     /api/questions/scroll   ->  scrollNextQuestions
 *
 * Tags :
 * GET     /api/questions/tags/all   ->  showAllTags
 *
 * Vote Up/Down :
 * PUT     /api/questions/:id/voteUp                      -> voteUp
 * PUT     /api/questions/:id/voteDown                    -> voteDown
 * PUT     /api/questions/:id/answers/:answerId/voteUp    -> voteUpAnswer
 * PUT     /api/questions/:id/answers/:answerId/voteDown  -> voteDownAnswer
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Question from './question.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
          return null;
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function handleUnauthorized(req, res) {
  return function(entity) {
    if(!entity) {
      return null;
    }
    if(entity.user._id.toString() !== req.user._id.toString()) {
      res.send(403).end();
      return null;
    }
    return entity;
  };
}

/*****************/
/* Questions API */
/*****************/

// Gets a list of Questions
export function index(req, res) {
  // return Question.find().exec()
  return Question.find().sort({createdAt: -1}).limit(10).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Question from the DB
export function show(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Question in the DB
export function create(req, res) {
  req.body.user = req.user;
  return Question.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Question in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Question.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(handleEntityNotFound(res))
    // .then(handleUnauthorized(req, res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Question in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    // .then(handleUnauthorized(req, res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Question from the DB
export function destroy(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

/*****************/
/* Answers API */
/*****************/

// Creates an Answer to a Question in the DB
export function createAnswer(req, res) {
  req.body.user = req.user;
  Question.update({_id: req.params.id}, {$push: {answers: req.body}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

// Updates an existing Answer of a Question in the DB
export function updateAnswer(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {'answers.$.content': req.body.content, 'answers.$.user': req.user.id}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

// Deletes an Answer of a Question from the DB
export function destroyAnswer(req, res) {
  Question.update({_id: req.params.id}, {$pull: {answers: {_id: req.params.answerId, 'user': req.user._id}}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

/*************************/
/* Question Comments API */
/*************************/

export function createComment(req, res) {
  req.body.user = req.user.id;
  Question.update({_id: req.params.id}, {$push: {comments: req.body}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

export function destroyComment(req, res) {
  Question.update({_id: req.params.id}, {$pull: {comments: {_id: req.params.commentId, 'user': req.user._id}}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

export function updateComment(req, res) {
  Question.update({_id: req.params.id, 'comments._id': req.params.commentId}, {'comments.$.content': req.body.content, 'comments.$.user': req.user.id}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

/*************************/
/* Answer Comments API */
/*************************/

export function createAnswerComment(req, res) {
  req.body.user = req.user.id;
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$push: {'answers.$.comments': req.body}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

export function destroyAnswerComment(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$pull: {'answers.$.comments': {_id: req.params.commentId, 'user': req.user._id}}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

export function updateAnswerComment(req, res) {
  Question.find({_id: req.params.id}).exec(function(err, questions) {
    if(err) {
      return handleError(res)(err);
    }
    if(questions.length === 0) {
      return res.send(404).end();
    }
    var question = questions[0];
    var found = false;
    for(var i = 0; i < question.answers.length; i++) {
      if(question.answers[i]._id.toString() === req.params.answerId) {
        found = true;
        var conditions = {};
        conditions._id = req.params.id;
        conditions['answers.' + i + '.comments._id'] = req.params.commentId;
        conditions['answers.' + i + '.comments.user'] = req.user._id;
        var doc = {};
        doc['answers.' + i + '.comments.$.content'] = req.body.content;
        /*jshint -W083 */
        Question.update(conditions, doc, function(err, num) {
          if(err) {
            return handleError(res)(err);
          }
          if(num === 0) {
            return res.send(404).end();
          }
          exports.show(req, res);
          return;
        });
      }
    }
    if(!found) {
      return res.send(404).end();
    }
  });
}

/*************************/
/* Stars API */
/*************************/

/* Star/Unstar Question */
export function star(req, res) {
  Question.update({_id: req.params.id}, {$push: {stars: req.user.id}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

export function unstar(req, res) {
  Question.update({_id: req.params.id}, {$pull: {stars: req.user.id}}, function(err, num) {
    if(err) {
      return handleError(res, err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

/* Star/Unstar Answer */
export function starAnswer(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$push: {'answers.$.stars': req.user.id}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

export function unstarAnswer(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$pull: {'answers.$.stars': req.user.id}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

/* Star/Unstar Question Comment */
export function starComment(req, res) {
  Question.update({_id: req.params.id, 'comments._id': req.params.commentId}, {$push: {'comments.$.stars': req.user.id}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

export function unstarComment(req, res) {
  Question.update({_id: req.params.id, 'comments._id': req.params.commentId}, {$pull: {'comments.$.stars': req.user.id}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

/* Star/Unstar Question Answer Comment */
export function pushOrPullStarAnswerComment(op, req, res) {
  Question.find({_id: req.params.id}).exec(function(err, questions) {
    if(err) {
      return handleError(res)(err);
    }
    if(questions.length === 0) {
      return res.send(404).end();
    }
    var question = questions[0];
    var found = false;
    for(var i = 0; i < question.answers.length; i++){
      if(question.answers[i]._id.toString() === req.params.answerId) {
        found = true;
        var conditions = {};
        conditions._id = req.params.id;
        conditions['answers.' + i + '.comments._id'] = req.params.commentId;
        var doc = {};
        doc[op] = {};
        doc[op]['answers.' + i + '.comments.$.stars'] = req.user.id;
        // Question.update({_id: req.params.id, 'answers.' + i + '.comments._id': req.params.commentId}, {op: {('answers.' + i + '.comments.$.stars'): req.user.id}}, function(err, num) {
        /*jshint -W083 */
        Question.update(conditions, doc, function(err, num) {
          if(err) {
            return handleError(res)(err);
          }
          if(num === 0) {
            return res.send(404).end();
          }
          exports.show(req, res);
          return;
        });
      }
    }
    if(!found) {
      return res.send(404).end();
    }
  });
}

export function starAnswerComment(req, res) {
  pushOrPullStarAnswerComment('$push', req, res);
}

export function unstarAnswerComment(req, res) {
  pushOrPullStarAnswerComment('$pull', req, res);
}

/**********************************/
/* User Questions and Starred API */
/**********************************/

// Gets User Questions
export function showUserQuestions(req, res) {
  var userId = req.params.userId;
  return Question.find({user: userId}).sort({createdAt: -1}).limit(5).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets User Favorites Questions
export function showUserFavoritesQuestions(req, res) {
  var userId = req.params.userId;
  return Question.find({$or: [
      {'stars': userId},
      {'answers.stars': userId},
      {'comments.stars': userId},
      {'answers.comments.stars': userId}
    ]}).sort({createdAt: -1}).limit(5).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*************************/
/* Search Questions API */
/*************************/

export function searchQuestions(req, res) {
  var keyword = req.params.keyword;
  return Question.find({$text: {$search: keyword}}).sort({createdAt: -1}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*************************/
/* Scroll Next Questions API */
/*************************/

export function scrollNextQuestions(req, res) {
  var lastId = req.params.lastId;
  return Question.find({_id: {$lt: lastId}}).sort({createdAt: -1}).limit(5).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*************************/
/* Tags API */
/*************************/

// Gets all Questions Tags
export function showAllTags(req, res) {
  return Question.distinct('tags.text').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*************************/
/* Votes API */
/*************************/

/* Vote Up/Down Question */
export function voteUp(req, res) {
  Question.update({_id: req.params.id}, {$inc: {'votes': 1}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

export function voteDown(req, res) {
  Question.update({_id: req.params.id}, {$inc: {'votes': -1}}, function(err, num) {
    if(err) {
      return handleError(res, err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

/* Vote Up/Down Answer */
export function voteUpAnswer(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$inc: {'answers.$.votes': 1}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}

export function voteDownAnswer(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$inc: {'answers.$.votes': -1}}, function(err, num) {
    if(err) {
      return handleError(res)(err);
    }
    if(num === 0) {
      return res.send(404).end();
    }
    exports.show(req, res);
  });
}
