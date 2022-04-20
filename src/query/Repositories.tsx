import { getApiClient } from "./axios";

export const GetRepositories = async (searchItems: string) => {
	let params: string[],
		values: string[],
		items = JSON.parse(searchItems);

	if (items.length) {
		params = items[0];
		values = items[1];
	} else {
		params = [];
		values = [];
	}

	const url_params = params.map((param, index) => param + "=" + values[index]);

	return await getApiClient().get(
		"/repositories" + (url_params.length ? "?" + url_params.join("&") : "")
	);
};
