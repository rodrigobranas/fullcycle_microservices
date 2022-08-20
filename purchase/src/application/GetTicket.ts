import EventRepository from "../domain/repository/EventRepository"
import TicketRepository from "../domain/repository/TicketRepository"

export default class GetTicket {

	constructor (
		readonly ticketRepository: TicketRepository, 
		readonly eventRepository: EventRepository
	) {
	}

	async execute (code: string): Promise<Output> {
		const ticket = await this.ticketRepository.get(code);
		const event = await this.eventRepository.get(ticket.eventCode);
		return {
			participantEmail: ticket.participantEmail,
			eventDescription: event.description,
			status: ticket.status,
			total: ticket.total
		}
	}
}

type Output = {
	participantEmail: string,
	eventDescription: string,
	status: string,
	total: number
}