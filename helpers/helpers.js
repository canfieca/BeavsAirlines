
// determines if an item is in an array
function item_in_array(arr, item) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == item) {
			return true
		}
	}

	return false;
}

module.exports = { item_in_array };