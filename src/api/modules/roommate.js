import * as RequestApi from '../request';

const URL = 'roommate';

export function postRoommate(data) {
	return RequestApi.postOne(`${URL}/create`, data);
}
