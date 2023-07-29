const express=require('express');
const controller=require('./controller')
const router=express.Router();

router.post('/create', (req, res, next) =>
  controller
    .create(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.post('/updateById/:userId/:postId', (req, res, next) =>
  controller
    .updateById(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getLikesByUserIdAndPostId/:userId/:postId', (req, res, next) =>
  controller
    .getLikesByUserIdAndPostId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getLikesByPostId/:postId', (req, res, next) =>
  controller
    .getLikesByPostId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

module.exports=router;