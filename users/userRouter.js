const express = require('express');
const Users = require('./userDb.js'); 
const router = express.Router();
const Post = require('../posts/postDb.js')

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(users => { 
    res.status(200).json(users);
  })
  .catch(err => { 
    res.status(500).json({message: "error in post a new user request"})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
    const Info = {...req.body, user_id: req.params.id}
    // req.body.name = {postedBy: }

    Post.insert(Info)
    .then(users2 => { 
      res.status(200).json(users2);

    })
    .catch(err => { 
      console.log(err); 
      res.status(500).json({errorMessage: "error in post request"}); 
    })

});

router.get('/',  (req, res) => {
  // do your magic!
  Users.get(req.query)
  .then(users => { 
    res.status(200).json(users);
  })
  .catch(err => { 
    res.status(500).json({message: "error in get request"})
  })
});

router.get('/:id', validateUserId,(req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(users => { 
    res.status(200).json(users); 
  })
  .catch(err => { 
    res.status(500).json({message: "error in get by Id"})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(users => { 
    res.status(200).json(users)
  })
  .catch(err => { 
    console.log('get by id posts error: ', err); 
    res.status(500).json({message: "get posts by id error"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(users => { 
    res.status(200).json(users);
  })
  .catch(users => { 
    res.status(500).json({message: "error deleteing user"})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(users => { 
    res.status(200).json(users)
  })
  .catch(users => { 
    res.status(500).json({message: "error updating database"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  //console.log('validateUserId', req.params.id)
  Users.getById(req.params.id)
  .then(user => { 
    //console.log(user, 'user')
    if(user){
      req.user = req.params.id
      next();
    }else{
      res.status(400).json({message: "invalid user id"})
    }
  })
  .catch(err => { 
    console.log('validateUserId', err)
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: "missing user data"})
  }else if(!req.body.name){
    res.status(400).json({message: "missing required name field"})
  }else{
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: 'missing post data'})
  }else if(!req.body.text){
    res.status(400).json({message: "missing required text field"})
  }else{
    next();
  }
}

module.exports = router;
