import axios from 'axios';

export const getData = async (url, token) => {
	const res = await axios.get(`/api/${url}`, { headers: { Authorization: token } });
	return res;
};

export const postData = async (url, data, token) => {
	const res = await axios.post(`/api/${url}`, data, { headers: { Authorization: token } });
	return res;
};

export const putData = async (url, data, token) => {
	const res = await axios.put(`/api/${url}`, data, { headers: { Authorization: token } });
	return res;
};

export const patchData = async (url, data, token) => {
	const res = await axios.patch(`/api/${url}`, data, { headers: { Authorization: token } });
	return res;
};

export const deleteData = async (url, token) => {
	const res = await axios.delete(`/api/${url}`, { headers: { Authorization: token } });
	return res;
};
