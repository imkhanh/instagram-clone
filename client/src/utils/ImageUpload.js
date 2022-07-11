export const checkImage = (file) => {
	let err = '';
	if (!file) return (err = 'File does not exist');

	if (file.size > 1024 * 1024) err = 'The largest image size is 1mb';

	if (file.type !== 'image/jpeg' && file.type !== 'image/png') err = 'Image format is incorrect';

	return err;
};

export const imageUpload = async (images) => {
	let imageArr = [];

	for (const image of images) {
		const formData = new FormData();
		formData.append('file', image);
		formData.append('upload_preset', 'txkgja9g');
		formData.append('cloud_name', 'imkhanh');

		const res = await fetch('https://api.cloudinary.com/v1_1/imkhanh/image/upload', {
			method: 'POST',
			body: formData,
		});

		const data = await res.json();
		imageArr.push({ public_id: data.public_id, url: data.secure_url });
	}
	return imageArr;
};
