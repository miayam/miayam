const chunk = (arr, size) => {
	const s = size === undefined ? 1 : Math.round(size);
	const l = arr === undefined ? 0 : arr.length;
	const result = [];
	let hold = [];

	if (l === 0 || s === 0) {
		return result;
	}

	for (let i = 0; i < l; i++) {
		hold.push(arr[i]);
		if (Number.isInteger((i + 1) / s) && ((i + 1) / s !== 0)) {
			result.push(hold);
			hold = [];
		} else if ((i + 1) === l) {
			result.push(hold);
		}
	}

	return result;
}

module.exports = chunk;