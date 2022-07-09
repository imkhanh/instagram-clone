require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

// connect database
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('========= Mongoose connect successfully ========='))
	.catch((err) => console.log('Database not connect'));

//midd
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes

app.use('/api', require('./routes/auth.route'));

//run server
const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port::::::: ${PORT}`);
});
