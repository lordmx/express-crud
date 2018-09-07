export interface IListener {
    getEvent(): string;
    handle(...args: any[]): void;
}