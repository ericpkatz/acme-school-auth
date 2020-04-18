const port = process.env.PORT || 3000;
const { syncAndSeed } = require('./db');

syncAndSeed();

require('./app').listen(port, ()=> console.log(`listening on port ${ port }`));
