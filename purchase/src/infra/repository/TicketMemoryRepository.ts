import Ticket from "../../domain/entity/Ticket";
import TicketRepository from "../../domain/repository/TicketRepository";

export default class TicketMemoryRepository implements TicketRepository {
	tickets: Ticket[];

	constructor () {
		this.tickets = [];
	}

	async save(ticket: Ticket): Promise<void> {
		this.tickets.push(ticket);
	}

	async get(code: string): Promise<Ticket> {
		const ticket = this.tickets.find(ticket => ticket.ticketCode === code);
		if (!ticket) throw new Error("Ticket not found");
		return ticket;
	}

	async update(ticket: Ticket): Promise<void> {
		const existingTicket = await this.get(ticket.ticketCode);
		this.tickets.splice(this.tickets.indexOf(existingTicket), 1, ticket);
	}
}
