'use strict';

var express = require('express');
var controller = require('./course.controller');

var router = express.Router();

var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.get('/user/:userId', auth.isAuthenticated(), controller.showUserCourses);

router.get('/tags/all', controller.showAllTags);

module.exports = router;
