import Event from "../entity/Event";

export default interface EventRepository {
	get (code: string): Promise<Event>;
	save (event: Event): Promise<void>;
}