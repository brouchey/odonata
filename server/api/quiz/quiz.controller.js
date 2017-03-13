/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/quiz              ->  index
 * POST    /api/quiz              ->  create
 * GET     /api/quiz/:id          ->  show
 * PUT     /api/quiz/:id          ->  upsert
 * PATCH   /api/quiz/:id          ->  patch
 * DELETE  /api/quiz/:id          ->  destroy
 * 
 * User Quizzes :
 * GET     /api/quiz/user/:userId   ->  showUserQuizzes
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Quiz from './quiz.model';

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

/*****************/
/* Quizzes API */
/*****************/

// Gets a list of Quizs
export function index(req, res) {
  return Quiz.find().sort({createdAt: -1}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Quiz from the DB
export function show(req, res) {
  return Quiz.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Quiz in the DB
export function create(req, res) {
  req.body.user = req.user;
  return Quiz.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Quiz in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Quiz.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Quiz in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Quiz.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Quiz from the DB
export function destroy(req, res) {
  return Quiz.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

/**********************************/
/* User Quizzes API */
/**********************************/

// Gets User Quizzes
export function showUserQuizzes(req, res) {
  var userId = req.params.userId;
  return Quiz.find({user: userId}).sort({createdAt: -1}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
