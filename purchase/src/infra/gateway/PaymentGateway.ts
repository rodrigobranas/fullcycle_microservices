import HttpClient from "../http/HttpClient"

export default class PaymentGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async execute (input: Input): Promise<Output> {
		const output = await this.httpClient.post("http://localhost:3001/transactions", input);
		return output;
	}
}

export type Input = {
	externalCode: string,
	creditCardNumber: string,
	creditCardCvv: string,
	creditCardExpDate: string,
	total: number
}

export type Output = {
	externalCode: string,
	success: boolean
}