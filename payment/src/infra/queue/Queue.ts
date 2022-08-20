export default interface Queue {
	connect (): Promise<void>;
	close (): Promise<void>;
	consume (eventName: string, callback: Function): Promise<void>;
	publish (eventName: string, data: any): Promise<void>;
}