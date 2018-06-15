const { server } = require('./server');
const { PORT } = require('./config');

server.listen(PORT, error => console.log(error || `Listening on :${PORT}`));
