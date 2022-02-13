//instantiate express module
require('dotenv').config()
const express = require("express");

const router = require('./src/routes')
const app = express();

//define the server port
const port = 5000;

app.use(express.json())

// Add endpoint grouping and router
app.use('/api/v1/', router)

//route image static file
app.use('/uploads', express.static('uploads'))

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`));