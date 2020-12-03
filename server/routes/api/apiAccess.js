//Server Access
const express = require('express');
const router = express.Router();

//DB Plugin
const mongoose = require('mongoose');

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

const { User } = require('../../models/models');

try {
	mongoose.connect(`${uri}/${dbName}`, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	});
} catch (error) {
	console.log(error);
}

router.get('/', (req, res) => {
	res.send('Start');
});

router.post('/sync', async (req, res) => {
	try {
		let userData = await User.findOne({
			$and: [{ username: req.body.username }, { password: req.body.password }],
		});
		// let userData = await User.find({});
		if (userData === null) {
			res.status(200).json({
				error: 'User not found!',
			});
		} else {
			res.status(200).json(userData);
		}
	} catch (error) {
		console.error('POST sync: ', error);
	}
});

router.post('/backup', async (req, res) => {
	try {
		let userData = await User.findOneAndUpdate(
			{
				username: req.body.username,
			},
			{
				notes: req.body.notes,
				tasks: req.body.tasks,
				lists: req.body.lists,
				created: req.body.created,
			},
			{
				upsert: true,
				new: true,
				useFindAndModify: false,
			}
		);
		res.status(200).json({ success: true, uploaded: userData });
	} catch (error) {
		console.error('POST backup: ', error);
	}
});

router.post('/add_user', async (req, res) => {
	try {
		let userData = await User.create({
			username: req.body.username,
			password: req.body.password,
			id: req.body.id,
		});
		res.status(200).json({ success: true, uploaded: userData });
	} catch (error) {
		console.error('POST user add: ', error);
	}
});

router.post('/new_user', async (req, res) => {
	console.log(req.body);
	let userCheck = await User.findOne({ username: req.body.username });
	if (userCheck === null) {
		res.status(200).json({ success: true });
	} else {
		res.status(200).json({ success: false });
	}
});

router.post('/delete', async (req, res) => {
	console.log(req.body);
	let data = await User.findOneAndDelete({ username: req.body.name });
	res.status(201).json(data);
});

module.exports = router;
