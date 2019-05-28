const server = require('./api/server.js');

server.listen(5000, () => {
    console.group('\n*** Server Running on http://localhost:5000 ***\n')
})