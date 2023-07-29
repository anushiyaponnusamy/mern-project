const express = require('express');
const controller = require('./controller');
const uploadMiddleware = require('../../uploadImage');
const router = express.Router();


// router.post('/upload', (req, res, next) =>
//   uploadMiddleware
//     .uploadImage(req)
//     .then((data) => res.status(200).send(data))
//     .catch((err) => next(err))
// );

router.post('/signup', uploadMiddleware, (req, res, next) =>
  controller
    .create(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);
router.post('/login', (req, res, next) =>
  controller
    .login(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err)))
router.post('/updateById', (req, res, next) =>
  controller
    .updateById(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getAllUsers/:pageNumber/:pagePerSize', (req, res, next) =>
  controller
    .getAllUsers(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getUserByUserId/:userId', (req, res, next) =>
  controller
    .getUserByUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/deleteUserByUserId/userId', (req, res, next) =>
  controller
    .deleteUserByUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

module.exports = router;