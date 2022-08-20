import Ticket from "../entity/Ticket";

export default interface TicketRepository {
	save (ticket: Ticket): Promise<void>;
	get (code: string): Promise<Ticket>;
	update (ticket: Ticket): Promise<void>;
}
