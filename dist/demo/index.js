import { Store } from "../modules/store/store.module";
class DemoModule {
    constructor(rootSelector) {
        this.rootSelector = rootSelector;
        this.store = new Store();
    }
    init() {
        this.setupNodes(this.rootSelector);
        this.setupEvents();
    }
    setupNodes(rootSelector) {
        this.root = document.querySelector(rootSelector);
        this.setKeyInput = this.root.querySelector("set-key");
        this.setNamespaceInput = this.root.querySelector("set-namespace");
        this.setValueInput = this.root.querySelector("set-value");
        this.getKeyInput = this.root.querySelector("set-key");
        this.getNamespaceInput = this.root.querySelector("set-namespace");
        this.getValuePlaceholder = this.root.querySelector("get-value");
        this.storeSnapshot = this.root.querySelector("store-snapshot");
        this.getValueButton = this.root.querySelector("get-value-button");
        this.setValueButton = this.root.querySelector("set-value-button");
    }
    setupEvents() {
        this.setValueButton.addEventListener("click", this.onSet);
        this.getValueButton.addEventListener("click", this.onGet);
    }
    onSet() {
        if (!this.setKeyInput.validity || this.setValueInput.validity) {
            return;
        }
        const namespace = this.setNamespaceInput.value;
        const key = this.setKeyInput.value;
        const value = this.setValueInput.value;
        if (namespace) {
            this.store.set({
                key,
                namespace
            }, value);
        }
        else {
            this.store.set(key, value);
        }
        this.updateStoreSnapshot();
    }
    clearSet() {
        this.setNamespaceInput.value = "";
        this.setKeyInput.value = "";
        this.setValueInput.value = "";
    }
    onGet() {
        if (!this.getKeyInput.validity) {
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
        }
        else {
            value = this.store.get(key);
        }
        this.getValuePlaceholder.innerHTML = value;
    }
    updateStoreSnapshot() {
        this.storeSnapshot.innerHTML = JSON.stringify(this.store);
    }
}
const demo = new DemoModule("app-root");
demo.init();
//# sourceMappingURL=index.js.map