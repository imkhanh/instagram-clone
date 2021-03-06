const Users = require('../models/user.model');

const userController = {
	searchUser: async (req, res) => {
		try {
			const users = await Users.find({ username: { $regex: req.query.username } })
				.limit(10)
				.select('fullname username avatar');

			return res.json({ users });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getUser: async (req, res) => {
		try {
			const user = await Users.findById(req.params.id).select('-password');
			if (!user) return res.status(400).json({ msg: 'User does not exists' });
			return res.json({ user });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	editUser: async (req, res) => {
		try {
			const { avatar, fullname, username, phone, website, story, gender, address } = req.body;

			await Users.findByIdAndUpdate({ _id: req.params.id }, { avatar, fullname, username, phone, website, story, gender, address });
			return res.json({ msg: 'Profile edited successfully' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

module.exports = userController;
