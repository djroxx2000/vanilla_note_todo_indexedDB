const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

//Routes
const dbRoute = require('./routes/api/apiAccess');
app.use('/api', dbRoute);

//Start server on PORT
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
