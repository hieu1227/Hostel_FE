import * as RequestApi from '../request';

const URL = 'issues';

export function postIssues(data) {
	return RequestApi.postOne(`${URL}/create`, data);
}

export function getIssuesTable() {
	return RequestApi.getAll(`${URL}/getall`);
}

