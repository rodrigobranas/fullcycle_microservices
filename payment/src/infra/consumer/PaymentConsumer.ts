import ProcessTransaction from "../../application/ProcessTransaction";
import Queue from "../queue/Queue";

export default class PaymentConsumer {
	
	constructor (readonly queue: Queue, readonly processTransaction: ProcessTransaction) {
		queue.consume("ticketPurchased", async function (msg: any) {
			await processTransaction.execute(msg);
		});
	}
}
