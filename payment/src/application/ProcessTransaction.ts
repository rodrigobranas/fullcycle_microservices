import Queue from "../infra/queue/Queue";

export default class ProcessTransaction {

	constructor (readonly queue: Queue) {
	}

	async execute (input: Input): Promise<void> {
		console.log(input);
		await this.queue.publish("transactionApproved", {
			externalCode: input.externalCode,
			success: true
		});
	}
}

type Input = {
	externalCode: string,
	creditCardNumber: string,
	creditCardCvv: string,
	creditCardExpDate: string,
	total: number
}
