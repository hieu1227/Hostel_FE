const LANGUAGE = 'StudyAppLanguage';
const TOKEN = 'access_token';
import cookies from 'js-cookie';
export function setToken(tokenKey, value) {
	cookies.set(tokenKey, value);
}
export function getTokenAccess(tokenName) {
	return cookies.get(tokenName);
}
export function getToken(tokenName) {
	return cookies.get(tokenName);
}
export function getRole(roleName) {
	const ROLE = cookies.get(roleName);
	if (ROLE) {
		return [ROLE];
	} else {
		return [];
	}
}
export default {
	LANGUAGE,
	TOKEN
};
