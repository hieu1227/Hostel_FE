export function validEmail(email) {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

export function validPassword(password) {
	const re = /^\S{8,16}$/;
	return re.test(password);
}

export function isEmptyOrWhiteSpace(value) {
	const re = /^\s*$/;
	return re.test(value);
}
export function isValidateExcel(file) {
	if (file['type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
		return true;
	}

	return false;
}
export function calcualateTotalService(array) {
	const sum = array.reduce((acc, currentValue, currentIndex, arr) => {
	  return acc + parseInt(currentValue.price);
	}, 0);
	return parseInt(sum);
  }
