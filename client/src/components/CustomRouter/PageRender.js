import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Loading from '../Alert/Loading';

const generatePage = (pageName) => {
	const comp = () => require(`../../pages/${pageName}`).default;

	try {
		return React.createElement(comp());
	} catch (error) {
		return <Loading />;
	}
};

const PageRender = () => {
	const { page, id } = useParams();
	const { auth } = useSelector((state) => state);
	let pageName = '';

	if (auth.token) {
		if (id) {
			pageName = `${page}/[id]`;
		} else {
			pageName = `${page}`;
		}
	}

	return generatePage(pageName);
};

export default PageRender;
