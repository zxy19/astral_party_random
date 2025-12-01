export class Emitter {
    private listeners: ((...args: any[]) => void)[] = [];
    public on(listener: (...args: any[]) => void): void {
        this.listeners.push(listener);
    }
    public emit(...args: any[]): void {
        this.listeners.forEach(listener => listener(...args));
    }
}