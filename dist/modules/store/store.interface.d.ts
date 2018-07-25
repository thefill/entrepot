export interface IStoreEntryConfig {
    namespace?: string;
    key?: string;
}
export interface IStoreEntry {
    currentStep: number;
    history: any[];
}
