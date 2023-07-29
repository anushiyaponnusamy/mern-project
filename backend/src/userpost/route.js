const express=require('express');
const controller=require('./controller')
const router=express.Router();
const uploadMiddleware = require('../../uploadImage');
router.post('/create' ,(req, res, next) =>
  controller
    .create(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.post('/updateById/:postId/:userId', (req, res, next) =>
  controller
    .updateById(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getAllImages/:pageNumber/:pagePerSize/:userId', (req, res, next) =>
  controller
    .getAllImages(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);


module.exports=router;