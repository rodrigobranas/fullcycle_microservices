import A from "../src/A";

test("Deve testar test", function () {
	const a = new A("b");
	expect(a.test).toBe("b");
});
