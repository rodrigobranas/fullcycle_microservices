import GetTicket from "../../application/GetTicket";
import PurchaseTicket from "../../application/PurchaseTicket";
import HttpServer from "../http/HttpServer";
import Queue from "../queue/Queue";

export default class MainController {

	constructor (
		readonly httpServer: HttpServer,
		readonly purchaseTicket: PurchaseTicket,
		readonly getTicket: GetTicket,
		readonly queue: Queue
	) {
		httpServer.on("post", "/purchases", async function (params: any, data: any) {
			queue.publish("purchaseTicket", data);
		});
		
		httpServer.on("get", "/tickets/:code", async function (params: any, data: any) {
			const output = await getTicket.execute(params.code);
			return output;
		});
	}
}