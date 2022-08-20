import Ticket from "../domain/entity/Ticket";
import EventRepository from "../domain/repository/EventRepository";
import TicketRepository from "../domain/repository/TicketRepository";
import PaymentGateway from "../infra/gateway/PaymentGateway";
import Queue from "../infra/queue/Queue";

export default class PurchaseTicket {

	constructor (
		readonly ticketRepository: TicketRepository, 
		readonly eventRepository: EventRepository,
		readonly paymentGateway: PaymentGateway,
		readonly queue: Queue
	) {
	}

	async execute (input: Input): Promise<void> {
		const event = await this.eventRepository.get(input.eventCode);
		const ticket = new Ticket(input.ticketCode, input.participantName, input.participantEmail, input.creditCardNumber, input.creditCardCvv, input.creditCardExpDate, event);
		await this.ticketRepository.save(ticket);
		await this.queue.publish("ticketPurchased", { 
			externalCode: input.ticketCode, 
			creditCardNumber: input.creditCardNumber,
			creditCardCvv: input.creditCardCvv,
			creditCardExpDate: input.creditCardExpDate,
			total: ticket.total
		});
	}
}

type Input = {
	ticketCode: string,
	participantName: string,
	participantEmail: string,
	eventCode: string,
	creditCardNumber: string,
	creditCardCvv: string,
	creditCardExpDate: string
}