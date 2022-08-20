export default interface HttpClient {
	get (url: string): Promise<any>;
	post (url: string, data: any): Promise<any>;
}