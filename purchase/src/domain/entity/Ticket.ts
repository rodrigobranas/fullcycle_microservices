import Event from "./Event";

export default class Ticket {
	eventCode: string;
	total: number;
	status: string;

	constructor (
		readonly ticketCode: string, 
		readonly participantName: string,
		readonly participantEmail: string,
		readonly creditCardNumber: string,
		readonly creditCardCvv: string,
		readonly creditCardExpDate: string,
		event: Event
	) {
		this.eventCode = event.code;
		this.total = event.price;
		this.status = "waiting_payment";
	}
}
