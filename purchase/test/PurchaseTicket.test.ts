import { randomUUID } from "crypto";
import GetTicket from "../src/application/GetTicket";
import PurchaseTicket from "../src/application/PurchaseTicket";
import EventMemoryRepository from "../src/infra/repository/EventMemoryRepository";
import TicketMemoryRepository from "../src/infra/repository/TicketMemoryRepository";
import Event from "../src/domain/entity/Event";
import AxiosAdapter from "../src/infra/http/AxiosAdapter";
import PaymentGateway from "../src/infra/gateway/PaymentGateway";
import RabbitMQAdapter from "../src/infra/queue/RabbitMQAdapter";

test.skip("Deve comprar um ticket", async function () {
	const httpClient = new AxiosAdapter();
	const ticketRepository = new TicketMemoryRepository();
	const eventRepository = new EventMemoryRepository();
	eventRepository.save(new Event("C", "Imersão Full Cycle", 100));
	const paymentGateway = new PaymentGateway(httpClient);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const purchaseTicket = new PurchaseTicket(ticketRepository, eventRepository, paymentGateway, queue);
	const ticketCode = randomUUID();
	const input = {
		ticketCode,
		participantName: "A",
		participantEmail: "B",
		eventCode: "C",
		creditCardNumber: "D",
		creditCardCvv: "E",
		creditCardExpDate: "F"
	};
	await purchaseTicket.execute(input);
	const getTicket = new GetTicket(ticketRepository, eventRepository);
	const output = await getTicket.execute(ticketCode);
	expect(output.total).toBe(100);
});
