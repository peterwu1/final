const express = require('express');
const router = new express.Router();
const Card = require('mongoose').model('Card');
const { ObjectID } = require('mongodb');

/*Dashboard route for authenticated user*/
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "Welcome User"
  });
});

/*Card get API call to get card list*/
router.get('/cards', (req, res) => {
  Card.find().sort({ _id: 1 })
    .then((cards) => {
      res.send({ cards });
    })
    .catch((error) => {
      res.status(400).send({ error: 'Unable to get the Flash Cards.' });
    });
});

/*Card post API call to add new flashcard*/
router.post('/card', (req, res) => {
  const card = new Card(req.body);
  // console.log(card);

  card.save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((error) => {
      res.status(400).send({ error: 'Unable to save the Flash Cards.' });
    });
});

/* Card delete API call to mongoDB*/
router.delete('/card', (req, res) => {
  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: 'Could not delete the Card because the ID is invalid.' });
  }
  
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ error: 'Could not delete the Card because the ID does not exist.' });
      }
      res.send({ card });
    })
    .catch((error) => {
      res.status(404).send({ error: 'Unable to delete the Card.' });
    });
});

/*Update API to edit flashcard*/
router.patch('/card', (req, res) => {
 
  // const body = _.pick(req.body, ['text', 'completed']);
  const id = req.body.id;
  // console.log(req.params.id);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: 'Could not update the Card because the ID is invalid.' });
  }

  Card.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ error: 'Could not update the Card because the ID does not exist.' });
      }
      res.send({ card });
    })
    .catch((error) => {
      res.status(400).send({ error: 'Unable to update the Card.' });
    });
});


module.exports = router;