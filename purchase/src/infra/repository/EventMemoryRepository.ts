import Event from "../../domain/entity/Event";
import EventRepository from "../../domain/repository/EventRepository";

export default class EventMemoryRepository implements EventRepository {
	events: Event[];

	constructor () {
		this.events = [];
	}

	async save(event: Event): Promise<void> {
		this.events.push(event);
	}

	async get(code: string): Promise<Event> {
		const event = this.events.find(event => event.code === code);
		if (!event) throw new Error("Event not found");
		return event;
	}

}
