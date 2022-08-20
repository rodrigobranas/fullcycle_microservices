import TicketRepository from "../domain/repository/TicketRepository";

export default class ConfirmTicket {

	constructor (readonly ticketRepository: TicketRepository) {
	}

	async execute (code: string): Promise<void> {
		const ticket = await this.ticketRepository.get(code);
		ticket.status = "confirmed";
		await this.ticketRepository.update(ticket);
		console.log(ticket);
	}
}