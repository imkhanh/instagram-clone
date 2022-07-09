import React from 'react';
import { useParams } from 'react-router';

const generatePage = (pageName) => {
	const comp = () => require(`../../pages/${pageName}`).default;

	try {
		return React.createElement(comp());
	} catch (error) {
		return <div>Loading</div>;
	}
};

const PageRender = () => {
	const { page, id } = useParams();
	let pageName = '';

	if (id) {
		pageName = `${page}/[id]`;
	} else {
		pageName = `${page}`;
	}

	return generatePage(pageName);
};

export default PageRender;
