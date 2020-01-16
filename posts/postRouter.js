const express = require('express');

const router = express.Router();
const Posts = require('./postDb.js')

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
  .then(user => { 
    console.log(user, 'userget posts')
    res.status(200).json(user)
  })
  .catch(err => { 
    console.log(err, "users posts get err")
    res.status(400).json({message: 'error getting user posts'}); 

  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
  .then(users => { 
    console.log(users, 'users get request')
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(err, "users posts get err")
    res.status(400).json({message: 'error in getting err'})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(users => { 
    console.log(users, "user remove request")
    res.status(200).json(users)
  })
  .catch(err => { 
    console.log(err, " users delete error")
    res.status(400).json({message:'error in remove err'})
  })
});

router.put('/:id',  (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
  .then(users => { 
    res.status(200).json(users)
  })
  .catch(err => { 
    res.status(400).json({message:'error in update'})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Posts.getById(req.params.id)
  .then(users => { 
    (users > 0) ? next() : res.status(400).json({message: 'error validating Post id'})
  })
}

module.exports = router;
