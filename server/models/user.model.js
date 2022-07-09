const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
	{
		fullname: { type: String, required: true },
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		gender: { type: String, default: 'male' },
		phone: { type: String, default: '' },
		address: { type: String, default: '' },
		story: { type: String, default: '' },
		website: { type: String, default: '' },
		following: [{ type: ObjectId, ref: 'user' }],
		followers: [{ type: ObjectId, ref: 'user' }],
		avatar: { type: String, default: 'https://res.cloudinary.com/imkhanh/image/upload/v1631617369/user.png' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
