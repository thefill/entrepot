import { Store } from "../modules/store/store.module";

class DemoModule {
    protected root: HTMLDivElement;
    protected setKeyInput: HTMLInputElement;
    protected setNamespaceInput: HTMLInputElement;
    protected setValueInput: HTMLInputElement;
    protected getKeyInput: HTMLInputElement;
    protected getNamespaceInput: HTMLInputElement;
    protected getValuePlaceholder: HTMLElement;
    protected getHistoryPlaceholder: HTMLElement;
    protected storeSnapshot: HTMLElement;
    protected getValueButton: HTMLButtonElement;
    protected setValueButton: HTMLButtonElement;

    protected store: Store;
    protected rootSelector: string;

    constructor(rootSelector: string) {
        this.rootSelector = rootSelector;
        this.store = new Store();
    }

    public init() {
        this.setupNodes(this.rootSelector);
        this.setupEvents();
    }

    protected setupNodes(rootSelector: string) {
        this.root = document.querySelector(rootSelector) as HTMLDivElement;
        this.setKeyInput = this.root.querySelector(
            "#set-key"
        ) as HTMLInputElement;
        this.setNamespaceInput = this.root.querySelector(
            "#set-namespace"
        ) as HTMLInputElement;
        this.setValueInput = this.root.querySelector(
            "#set-value"
        ) as HTMLInputElement;
        this.getKeyInput = this.root.querySelector(
            "#get-key"
        ) as HTMLInputElement;
        this.getNamespaceInput = this.root.querySelector(
            "#get-namespace"
        ) as HTMLInputElement;
        this.getValuePlaceholder = this.root.querySelector(
            "#get-value"
        ) as HTMLElement;
        this.getHistoryPlaceholder = this.root.querySelector(
            "#get-history"
        ) as HTMLElement;
        this.storeSnapshot = this.root.querySelector(
            "#store-snapshot"
        ) as HTMLElement;
        this.getValueButton = this.root.querySelector(
            "#get-value-button"
        ) as HTMLButtonElement;
        this.setValueButton = this.root.querySelector(
            "#set-value-button"
        ) as HTMLButtonElement;
    }

    protected setupEvents() {
        this.setValueButton.addEventListener("click", this.onSet.bind(this));
        this.getValueButton.addEventListener("click", this.onGet.bind(this));
    }

    protected onSet() {
        if (!this.setKeyInput.validity.valid || !this.setValueInput.validity.valid) {
            return;
        }

        const namespace = this.setNamespaceInput.value;
        const key = this.setKeyInput.value;
        const value = this.setValueInput.value;

        if (namespace) {
            this.store.set(
                {
                    key,
                    namespace
                },
                value
            );
        } else {
            this.store.set(key, value);
        }

        this.updateStoreSnapshot();
        this.clearSet();
    }

    protected clearSet() {
        this.setNamespaceInput.value = "";
        this.setKeyInput.value = "";
        this.setValueInput.value = "";
    }

    protected onGet() {
        if (!this.getKeyInput.validity.valid) {
            return;
        }

        const namespace = this.getNamespaceInput.value;
        const key = this.getKeyInput.value;

        let value;
        if (namespace) {
            value = this.store.get({
                key,
                namespace
            });
        } else {
            value = this.store.get(key);
        }

        this.getValuePlaceholder.innerHTML = value;
        this.getHistoryPlaceholder.innerHTML = '<strong>Gay</strong>';
    }

    protected updateStoreSnapshot() {
        this.storeSnapshot.innerHTML = JSON.stringify(this.store);
    }
}

const demo = new DemoModule("#app-root");
demo.init();
