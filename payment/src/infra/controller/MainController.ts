import ProcessTransaction from "../../application/ProcessTransaction";
import HttpServer from "../http/HttpServer";

export default class MainController {

	constructor (
		readonly httpServer: HttpServer,
		readonly processTransaction: ProcessTransaction
	) {
		httpServer.on("post", "/transactions", async function (params: any, data: any) {
			const output = await processTransaction.execute(data);
			return output;
		});
	}
}