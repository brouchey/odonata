/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/courses              ->  index
 * POST    /api/courses              ->  create
 * GET     /api/courses/:id          ->  show
 * PUT     /api/courses/:id          ->  upsert
 * PATCH   /api/courses/:id          ->  patch
 * DELETE  /api/courses/:id          ->  destroy
 * 
 * User Courses :
 * GET     /api/courses/user/:userId   ->  showUserCourses
 * 
 * Tags :
 * GET     /api/courses/tags/all   ->  showAllTags
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Course from './course.model';

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

// Gets a list of Courses
export function index(req, res) {
  return Course.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Course from the DB
export function show(req, res) {
  return Course.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Course in the DB
export function create(req, res) {
  req.body.user = req.user;
  return Course.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Course in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Course.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Course in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Course.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Course from the DB
export function destroy(req, res) {
  return Course.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

/**********************************/
/* User Courses API */
/**********************************/

// Gets User Courses
export function showUserCourses(req, res) {
  var userId = req.params.userId;
  return Course.find({user: userId}).sort({createdAt: -1}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*************************/
/* Tags API */
/*************************/

// Gets all Questions Tags
export function showAllTags(req, res) {
  return Course.distinct('tags.text').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
