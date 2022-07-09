import { useEffect, useRef, useState } from 'react';

const useClickOutside = () => {
	const menuRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) setIsVisible(false);
		};

		window.addEventListener('click', handleClick, true);

		return () => window.removeEventListener('click', handleClick, true);
	}, []);
	return { menuRef, isVisible, setIsVisible };
};

export default useClickOutside;
