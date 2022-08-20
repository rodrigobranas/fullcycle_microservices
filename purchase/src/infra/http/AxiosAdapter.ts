import axios from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdapter implements HttpClient {

	async get(url: string): Promise<any> {
		const response = await axios({
			url,
			method: "get"
		});
		return response.data;
	}

	async post(url: string, data: any): Promise<any> {
		const response = await axios({
			url,
			method: "post",
			data
		});
		return response.data;
	}

}