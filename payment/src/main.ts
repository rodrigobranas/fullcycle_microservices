import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/controller/MainController";
import ProcessTransaction from "./application/ProcessTransaction";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import PaymentConsumer from "./infra/consumer/PaymentConsumer";

async function init () {
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const httpServer = new ExpressAdapter();
	const processTransaction = new ProcessTransaction(queue);
	new MainController(httpServer, processTransaction);
	new PaymentConsumer(queue, processTransaction);
	httpServer.listen(3001);
}

init();
