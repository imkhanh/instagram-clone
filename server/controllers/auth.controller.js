const Users = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
	register: async (req, res) => {
		try {
			const { fullname, username, email, password } = req.body;
			const userNameLowerCase = username.toLowerCase().replace(/ /g, '');
			if (!(fullname && username && email && password)) return res.status(400).json({ msg: 'Please fill all the fields' });

			const user_name = await Users.findOne({ username: userNameLowerCase });
			if (user_name) return res.status(400).json({ msg: 'This user already exists' });

			const user_email = await Users.findOne({ email });
			if (user_email) return res.status(400).json({ msg: 'The email already exists' });

			if (password.length < 6) return res.status(400).json({ msg: 'Password must be at least 6 character long' });

			const passwordHash = await bcrypt.hash(password, 12);

			const newUser = new Users({ fullname, username: userNameLowerCase, email, password: passwordHash });

			const access_token = createAccessToken({ id: newUser._id });
			const refresh_token = createRefreshToken({ id: newUser._id });

			res.cookie('refreshtoken', refresh_token, {
				httpOnly: true,
				path: '/api/refresh_token',
				maxAge: 7 * 7 * 24 * 60 * 60 * 1000,
			});

			await newUser.save();
			return res.status(200).json({ msg: 'Register Success', access_token, user: { ...newUser._doc, password: '' } });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!(email && password)) return res.status(400).json({ msg: 'Please fill all the fields' });

			const user = await Users.findOne({ email }).populate('following followers', '-password');
			if (!user) return res.status(400).json({ msg: 'This user does not exists' });

			if (password.length < 6) return res.status(400).json({ msg: 'Password must be at least 6 character long' });

			const isMatch = await bcrypt.hash(password, user.password);
			if (!isMatch) return res.status(400).json({ msg: 'Password is  incorrect' });

			const access_token = createAccessToken({ id: user._id });
			const refresh_token = createRefreshToken({ id: user._id });

			res.cookie('refreshtoken', refresh_token, {
				httpOnly: true,
				path: '/api/refresh_token',
				maxAge: 7 * 7 * 24 * 60 * 60 * 1000,
			});

			return res.status(200).json({ msg: 'Login Success', access_token, user: { ...user._doc, password: '' } });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	logout: async (req, res) => {
		try {
			res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
			return res.status(200).json({ msg: 'Logged out' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	generateAccessToken: async (req, res) => {
		try {
			const rf_token = req.cookies.refreshtoken;

			if (!rf_token) return res.status(400).json({ msg: 'Please login or register now' });

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (error, result) => {
				if (error) return res.status(400).json({ msg: 'Please login or register now' });

				const user = await Users.findById(result.id).select('-password').populate('following followers', '-password');

				if (!user) return res.status(400).json({ msg: 'This user does not exist' });

				const access_token = createAccessToken({ id: result.id });
				return res.status(200).json({ access_token, user });
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

const createAccessToken = (id) => {
	return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (id) => {
	return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = authController;
