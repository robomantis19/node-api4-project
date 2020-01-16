const express = require('express');
const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')

const server = express();
server.use(express.json()); 

function logger(req, res, next) {
  const { method, originalUrl } = req; 
  console.log(`${method} to ${originalUrl}`);
  next();
}

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);

});

server.use(logger);

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter); 

//custom middleware



module.exports = server;
