export interface IStoreEntryConfig {
    namespace?: string;
    key?: string;
    // TODO: implement:
    // history?: boolean;
    // historyLimit?: number;
    // Schema: json schema
    // persistTime: number
    // debounceEmit
    // keepForwardHistory
}

export interface IStoreEntry {
    currentStep: number;
    history: any[];
}
