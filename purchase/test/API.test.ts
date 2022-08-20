import axios from "axios";
import { randomUUID } from "crypto";

function sleep (timeout: number) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve(true);
		}, timeout);
	})
}

test("Deve comprar um ticket pela API", async function () {
	const ticketCode = randomUUID();
	await axios({
		url: "http://localhost:3000/purchases",
		method: "post",
		data: {
			ticketCode,
			participantName: "A",
			participantEmail: "B",
			eventCode: "C",
			creditCardNumber: "D",
			creditCardCvv: "E",
			creditCardExpDate: "F"
		}
	});
	await sleep(500);
	const response = await axios({
		url: `http://localhost:3000/tickets/${ticketCode}`,
		method: "get"
	});
	const output = response.data;
	expect(output.total).toBe(100);
	expect(output.status).toBe("confirmed");
});
