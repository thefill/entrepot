"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_module_1 = require("../modules/store/store.module");
var DemoModule = /** @class */ (function () {
    function DemoModule(rootSelector) {
        this.rootSelector = rootSelector;
        this.store = new store_module_1.Store();
    }
    DemoModule.prototype.init = function () {
        this.setupNodes(this.rootSelector);
        this.setupEvents();
    };
    DemoModule.prototype.setupNodes = function (rootSelector) {
        this.root = document.querySelector(rootSelector);
        this.setKeyInput = this.root.querySelector("#set-key");
        this.setNamespaceInput = this.root.querySelector("#set-namespace");
        this.setValueInput = this.root.querySelector("#set-value");
        this.getKeyInput = this.root.querySelector("#get-key");
        this.getNamespaceInput = this.root.querySelector("#get-namespace");
        this.getValuePlaceholder = this.root.querySelector("#get-value");
        this.getHistoryPlaceholder = this.root.querySelector("#get-history");
        this.storeSnapshot = this.root.querySelector("#store-snapshot");
        this.getValueButton = this.root.querySelector("#get-value-button");
        this.setValueButton = this.root.querySelector("#set-value-button");
    };
    DemoModule.prototype.setupEvents = function () {
        this.setValueButton.addEventListener("click", this.onSet.bind(this));
        this.getValueButton.addEventListener("click", this.onGet.bind(this));
    };
    DemoModule.prototype.onSet = function () {
        if (!this.setKeyInput.validity.valid || !this.setValueInput.validity.valid) {
            return;
        }
        var namespace = this.setNamespaceInput.value;
        var key = this.setKeyInput.value;
        var value = this.setValueInput.value;
        if (namespace) {
            this.store.set({
                key: key,
                namespace: namespace
            }, value);
        }
        else {
            this.store.set(key, value);
        }
        this.updateStoreSnapshot();
        this.clearSet();
    };
    DemoModule.prototype.clearSet = function () {
        this.setNamespaceInput.value = "";
        this.setKeyInput.value = "";
        this.setValueInput.value = "";
    };
    DemoModule.prototype.onGet = function () {
        if (!this.getKeyInput.validity.valid) {
            return;
        }
        var namespace = this.getNamespaceInput.value;
        var key = this.getKeyInput.value;
        var value;
        if (namespace) {
            value = this.store.get({
                key: key,
                namespace: namespace
            });
        }
        else {
            value = this.store.get(key);
        }
        this.getValuePlaceholder.innerHTML = value;
        this.getHistoryPlaceholder.innerHTML = '<strong>Gay</strong>';
    };
    DemoModule.prototype.updateStoreSnapshot = function () {
        this.storeSnapshot.innerHTML = JSON.stringify(this.store);
    };
    return DemoModule;
}());
var demo = new DemoModule("#app-root");
demo.init();
//# sourceMappingURL=index.js.map