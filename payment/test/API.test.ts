import axios from "axios";
import { randomUUID } from "crypto";

test("Deve fazer um pagamento pela API", async function () {
	const ticketCode = randomUUID();
	const response = await axios({
		url: "http://localhost:3001/transactions",
		method: "post",
		data: {
			ticketCode,
			creditCardNumber: "D",
			creditCardCvv: "E",
			creditCardExpDate: "F",
			total: 100
		}
	});
	const output = response.data;
	expect(output.success).toBe(true);
});
