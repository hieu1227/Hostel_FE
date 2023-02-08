import * as RequestApi from '../request';

const URL = 'dashboard';



export function getRevenue(data) {
	return RequestApi.getOne(URL,data);
}


export function getRevenueHostel(data) {
	return RequestApi.getOne(`${URL}/area`,data);
}

