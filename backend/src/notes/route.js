const express=require('express');
const controller=require('./controller')
const router=express.Router();

router.post('/create', (req, res, next) =>
  controller
    .create(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.post('/updateById', (req, res, next) =>
  controller
    .updateById(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getNotesByUserId/:userId', (req, res, next) =>
  controller
    .getNotesByUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getNotesByNotesIdAndUserId/:notesId/:userId', (req, res, next) =>
  controller
    .getNotesByNotesIdAndUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/deleteNotesByUserId/userId', (req, res, next) =>
  controller
    .deleteNotesByUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/deleteNotesByNotesId/userId', (req, res, next) =>
  controller
    .deleteNotesByNotesId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

module.exports=router;