const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
	id: Number,
	userID: Number,
	created: Number,
	title: String,
});

const taskSchema = new Schema({
	id: Number,
	userID: Number,
	completed: Boolean,
	title: String,
	description: String,
	taskListID: String,
	dueDate: String,
	reminderDate: String,
	reminderTime: String,
	important: Boolean,
	created: Number,
});

const noteSchema = new Schema({
	id: Number,
	userID: Number,
	title: String,
	description: String,
	important: Boolean,
	created: Number,
});

const userSchema = new Schema(
	{
		id: Number,
		username: { type: String, unique: true },
		password: String,
		created: Number,
		lists: [listSchema],
		tasks: [taskSchema],
		notes: [noteSchema],
	},
	{
		writeConcern: {
			w: 'majority',
			j: true,
			wtimeout: 5000,
		},
	}
);

const User = mongoose.model('users', userSchema);

module.exports = { User };
