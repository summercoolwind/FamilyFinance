const express = require('express');
const app = express();
const port = 5000;

app.use('/', express.static('dist/client'));

app.listen(port, () => console.log(`Example app listening on port http://127.0.0.1:${port}!`))