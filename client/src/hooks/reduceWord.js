const reduceWords = (name, length = 10) => {
	if (!name) {
		return;
	}
	if (name.length > length) return `${name?.substring(0, length + 1)}..`;
};
export default reduceWords;
