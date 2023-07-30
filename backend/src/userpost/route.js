const express=require('express');
const controller=require('./controller')
const router=express.Router();
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

router.post('/delete/:postId/:userId', (req, res, next) =>
  controller
    .delete(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getAllImages/:pageNumber/:pagePerSize/:userId', (req, res, next) =>
  controller
    .getAllImages(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);


router.get('/getSelectedImageAndOtherRecommendations/:userId/:postId/:pageNumber/:pagePerSize', (req, res, next) =>
  controller
    .getSelectedImageAndOtherRecommendations(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

module.exports=router;