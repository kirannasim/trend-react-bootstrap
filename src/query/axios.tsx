import axios from "axios";

const axiosInstance = axios.create({
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
	baseURL: process.env.REACT_APP_API_GIT_TRENDING_URL,
});

export function getApiClient() {
	return axiosInstance;
}
