import Cookies from 'js-cookie';

const TokenKey = 'access_token';

export function isLogged() {
	return Cookies.get(TokenKey) === '1';
}

export function setLogged(access_token) {
	return Cookies.set(TokenKey, access_token);
}

export function removeToken() {
	return Cookies.remove(TokenKey);
}
