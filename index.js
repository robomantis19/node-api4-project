// code away!
const server = require('./server.js'); 
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { 
    console.log('\n *** Starting server on port 4000 *** \n'); 
})

