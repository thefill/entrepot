export type StoreEventListener = (...args: any[]) => void;

export interface IEvents {
    [event: string]: StoreEventListener[];
}

export class Effects {
    protected events: IEvents = {};

    // TODO: define value of events
    // ('set', 'update', 'delete', 'setNamespace', 'setNamespace', 'deleteNamespace', 'updateInNamespace')
    // TODO: in listener creation provide StoreEntryKeySubstitute to pinpoint events for specific value
    // TODO: extend base-store module with Effects class
    public on(event: string, listener: StoreEventListener): () => void {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }

        this.events[event].push(listener);
        return () => this.removeListener(event, listener);
    }

    public removeListener(event: string, listener: StoreEventListener): void {
        if (typeof this.events[event] !== 'object') {
            return;
        }

        const idx: number = this.events[event].indexOf(listener);
        if (idx > -1) {
            this.events[event].splice(idx, 1);
        }
    }

    public removeAllListeners(): void {
        Object.keys(this.events).forEach((event: string) =>
            this.events[event].splice(0, this.events[event].length)
        );
    }

    public emit(event: string, ...args: any[]): void {
        if (typeof this.events[event] !== 'object') {
            return;
        }

        [...this.events[event]].forEach((listener) => listener.apply(this, args));
    }

    public once(event: string, listener: StoreEventListener): () => void {
        const remove: (() => void) = this.on(event, (...args: any[]) => {
            remove();
            listener.apply(this, args);
        });

        return remove;
    }
}
