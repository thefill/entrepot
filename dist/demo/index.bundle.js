/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/demo/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/demo/index.js":
/*!****************************!*\
  !*** ./dist/demo/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar store_module_1 = __webpack_require__(/*! ../modules/store/store.module */ \"./dist/modules/store/store.module.js\");\nvar DemoModule = /** @class */ (function () {\n    function DemoModule(rootSelector) {\n        this.rootSelector = rootSelector;\n        this.store = new store_module_1.Store();\n    }\n    DemoModule.prototype.init = function () {\n        this.setupNodes(this.rootSelector);\n        this.setupEvents();\n    };\n    DemoModule.prototype.setupNodes = function (rootSelector) {\n        this.root = document.querySelector(rootSelector);\n        this.setKeyInput = this.root.querySelector(\"#set-key\");\n        this.setNamespaceInput = this.root.querySelector(\"#set-namespace\");\n        this.setValueInput = this.root.querySelector(\"#set-value\");\n        this.getKeyInput = this.root.querySelector(\"#get-key\");\n        this.getNamespaceInput = this.root.querySelector(\"#get-namespace\");\n        this.getValuePlaceholder = this.root.querySelector(\"#get-value\");\n        this.getHistoryPlaceholder = this.root.querySelector(\"#get-history\");\n        this.storeSnapshot = this.root.querySelector(\"#store-snapshot\");\n        this.getValueButton = this.root.querySelector(\"#get-value-button\");\n        this.setValueButton = this.root.querySelector(\"#set-value-button\");\n    };\n    DemoModule.prototype.setupEvents = function () {\n        this.setValueButton.addEventListener(\"click\", this.onSet.bind(this));\n        this.getValueButton.addEventListener(\"click\", this.onGet.bind(this));\n    };\n    DemoModule.prototype.onSet = function () {\n        if (!this.setKeyInput.validity.valid || !this.setValueInput.validity.valid) {\n            return;\n        }\n        var namespace = this.setNamespaceInput.value;\n        var key = this.setKeyInput.value;\n        var value = this.setValueInput.value;\n        if (namespace) {\n            this.store.set({\n                key: key,\n                namespace: namespace\n            }, value);\n        }\n        else {\n            this.store.set(key, value);\n        }\n        this.updateStoreSnapshot();\n        this.clearSet();\n    };\n    DemoModule.prototype.clearSet = function () {\n        this.setNamespaceInput.value = \"\";\n        this.setKeyInput.value = \"\";\n        this.setValueInput.value = \"\";\n    };\n    DemoModule.prototype.onGet = function () {\n        if (!this.getKeyInput.validity.valid) {\n            return;\n        }\n        var namespace = this.getNamespaceInput.value;\n        var key = this.getKeyInput.value;\n        var value;\n        if (namespace) {\n            value = this.store.get({\n                key: key,\n                namespace: namespace\n            });\n        }\n        else {\n            value = this.store.get(key);\n        }\n        this.getValuePlaceholder.innerHTML = value;\n        this.getHistoryPlaceholder.innerHTML = '<strong>Gay</strong>';\n    };\n    DemoModule.prototype.updateStoreSnapshot = function () {\n        this.storeSnapshot.innerHTML = JSON.stringify(this.store);\n    };\n    return DemoModule;\n}());\nvar demo = new DemoModule(\"#app-root\");\ndemo.init();\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///./dist/demo/index.js?");

/***/ }),

/***/ "./dist/modules/store/store-entry-key.class.js":
/*!*****************************************************!*\
  !*** ./dist/modules/store/store-entry-key.class.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Represents key for the store entry\n */\nvar StoreEntryKeyClass = /** @class */ (function () {\n    /**\n     * Create key\n     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key\n     */\n    function StoreEntryKeyClass(key) {\n        // if key object passed - don't create again\n        if (key instanceof StoreEntryKeyClass) {\n            Object.assign(this, key);\n            return;\n        }\n        // if not key config\n        if (typeof key === \"string\") {\n            this.key = key;\n            return;\n        }\n        else if (key.key) {\n            this.key = key.key;\n            if (key.namespace) {\n                this.namespace = key.namespace;\n            }\n        }\n    }\n    return StoreEntryKeyClass;\n}());\nexports.StoreEntryKeyClass = StoreEntryKeyClass;\n//# sourceMappingURL=store-entry-key.class.js.map\n\n//# sourceURL=webpack:///./dist/modules/store/store-entry-key.class.js?");

/***/ }),

/***/ "./dist/modules/store/store-entry.class.js":
/*!*************************************************!*\
  !*** ./dist/modules/store/store-entry.class.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Single store entry\n */\nvar StoreEntryClass = /** @class */ (function () {\n    function StoreEntryClass(value) {\n        // TODO: emit changes from single entry??\n        // current step in history we are on\n        this.currentStep = 0;\n        // history of value\n        this.history = [];\n        this.history.push(value);\n    }\n    /**\n     * Update history with new value, if current step not the last index\n     * of history all entries past this point are removed\n     * @param {T} value\n     * @returns {number} Current step value\n     */\n    StoreEntryClass.prototype.update = function (value) {\n        // Remove all entries that are in front of current step\n        this.history = this.history.slice(0, this.currentStep);\n        return this.history.push(value);\n    };\n    return StoreEntryClass;\n}());\nexports.StoreEntryClass = StoreEntryClass;\n//# sourceMappingURL=store-entry.class.js.map\n\n//# sourceURL=webpack:///./dist/modules/store/store-entry.class.js?");

/***/ }),

/***/ "./dist/modules/store/store.module.js":
/*!********************************************!*\
  !*** ./dist/modules/store/store.module.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar store_entry_key_class_1 = __webpack_require__(/*! ./store-entry-key.class */ \"./dist/modules/store/store-entry-key.class.js\");\nvar store_entry_class_1 = __webpack_require__(/*! ./store-entry.class */ \"./dist/modules/store/store-entry.class.js\");\n/**\n * Main store class\n */\nvar Store = /** @class */ (function () {\n    /**\n     * Constructor\n     * @param {Array} initialValues\n     */\n    function Store(initialValues) {\n        // Main store\n        this.store = {};\n        // Main namespace store\n        this.namespaceStore = {};\n        // if values provided\n        if (Array.isArray(initialValues) && initialValues.length) {\n            // hydrate store with values\n            this.set(initialValues);\n        }\n    }\n    // TODO: get history list\n    // TODO: get history length\n    // TODO: get history list with values\n    // TODO: move back in time x steps\n    // TODO: get value from x step\n    // TODO: get current step\n    // TODO: move back in time to prev\n    // TODO: move back in time to next (if keep forward)\n    // TODO: emit change\n    // TODO: automatic docs via http://typedoc.org/guides/doccomments/\n    // TODO: move to npm-run-all\n    // TODO: move to npm-watch\n    /**\n     * Separate values from their references\n     * @param {any} value\n     * @return {any}\n     */\n    Store.decoupleValue = function (value) {\n        if (!value) {\n            return value;\n        }\n        if (Array.isArray(value)) {\n            return value.slice();\n        }\n        else if (typeof value === \"object\") {\n            return Object.assign({}, value);\n        }\n        return value;\n    };\n    /**\n     * Check if namespace, entry in namespace or entry alone exists\n     * @param {StoreEntryKeyClass} key\n     * @returns {boolean}\n     */\n    Store.prototype.entryExists = function (key) {\n        // if namespace and key to check\n        if (key.namespace && key.key) {\n            return !!(this.namespaceStore[key.namespace] &&\n                this.namespaceStore[key.namespace][key.key]);\n        }\n        else if (key.namespace) {\n            // if only namespace to check\n            return !!this.namespaceStore[key.namespace];\n        }\n        else {\n            // if only entry\n            return !!this.store[key.key];\n        }\n    };\n    /**\n     * Reset:\n     *  - whole store if no params provided\n     *  - namespace: if namespace name or key provided\n     * @param {StoreEntryKeySubstitute} key\n     */\n    Store.prototype.reset = function (namespace) {\n        // if any reference namespace provided\n        if (typeof namespace !== 'undefined') {\n            if (typeof namespace === 'string') {\n                delete this.store[namespace];\n            }\n            else if (namespace.namespace) {\n                // if object with key provided\n                delete this.store[namespace.namespace];\n            }\n        }\n        else {\n            // reset whole store\n            this.store = {};\n        }\n    };\n    /**\n     * Set single or multiple entries, returns access key\n     * @param {StoreEntryKeySubstitute | Array<{key: StoreEntryKeySubstitute; value: T}>} key\n     * @param {T} value\n     * @returns {StoreEntryKeyClass | void | Array<StoreEntryKeyClass | void>}\n     */\n    Store.prototype.set = function (key, value) {\n        var _this = this;\n        // if multiple entries to create\n        if (Array.isArray(key)) {\n            return key.map(function (setConfig) {\n                return _this.setEntry(setConfig.key, setConfig.value);\n            });\n        }\n        else {\n            // if no value\n            return this.setEntry(key, value);\n        }\n    };\n    /**\n     * Get single or multiple entries\n     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key\n     * @returns {void | Array<void | T> | T}\n     */\n    Store.prototype.get = function (key) {\n        var _this = this;\n        // if multiple entries to create\n        if (Array.isArray(key)) {\n            return key.map(function (singleKey) {\n                return _this.getEntry(singleKey);\n            });\n        }\n        else {\n            // if no value\n            return this.getEntry(key);\n        }\n    };\n    /**\n     * Delete single or multiple entries, returns current entry value\n     * @param {StoreEntryKeySubstitute | StoreEntryKeySubstitute[]} key\n     * @returns {T[] | void | void[] | T}\n     */\n    Store.prototype.delete = function (key) {\n        var _this = this;\n        // if multiple entries to create\n        if (Array.isArray(key)) {\n            return key.map(function (singleKey) {\n                return _this.deleteEntry(singleKey);\n            });\n        }\n        else {\n            // if no value\n            return this.deleteEntry(key);\n        }\n    };\n    /**\n     * Set single entry\n     * @param {string | IStoreEntryConfig} key\n     * @param {any} value\n     * @return {StoreEntryKeyClass}\n     */\n    Store.prototype.setEntry = function (key, value) {\n        var keyObject = new store_entry_key_class_1.StoreEntryKeyClass(key);\n        if (!keyObject.key) {\n            return;\n        }\n        // we don't pass undefined values to the store\n        if (typeof value === 'undefined') {\n            return;\n        }\n        value = Store.decoupleValue(value);\n        this.setOrUpdateEntry(keyObject, value);\n        return keyObject;\n    };\n    /**\n     * Get single entry\n     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key\n     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}\n     */\n    Store.prototype.getEntry = function (key) {\n        var keyObject = new store_entry_key_class_1.StoreEntryKeyClass(key);\n        if (!keyObject.key) {\n            return;\n        }\n        if (!this.entryExists(keyObject)) {\n            return;\n        }\n        // retrieve entry\n        var entry;\n        if (keyObject.namespace) {\n            entry = this.namespaceStore[keyObject.namespace][keyObject.key];\n        }\n        else {\n            entry = this.store[keyObject.key];\n        }\n        return entry.history[entry.currentStep];\n    };\n    /**\n     * Delete single entry, returns its current value\n     * @param {string | IStoreEntryConfig | StoreEntryKeyClass} key\n     * @returns {IStoreEntry | {[p: string]: IStoreEntry}}\n     */\n    Store.prototype.deleteEntry = function (key) {\n        var keyObject = new store_entry_key_class_1.StoreEntryKeyClass(key);\n        if (!keyObject.key) {\n            return;\n        }\n        if (!this.entryExists(keyObject)) {\n            return;\n        }\n        // get entry value and delete entry form store\n        var entry;\n        // if entry in namespace\n        if (keyObject.namespace && keyObject.key) {\n            entry = this.namespaceStore[keyObject.namespace][keyObject.key];\n            return entry.history[entry.currentStep];\n        }\n        else if (keyObject.namespace) {\n            // if only namespace provided\n            delete this.namespaceStore[keyObject.namespace];\n            return;\n        }\n        else {\n            entry = this.store[keyObject.key];\n            return entry.history[entry.currentStep];\n        }\n    };\n    /**\n     * Set or update value in store\n     * @param {StoreEntryKeyClass} key\n     * @param {any} value\n     * @return {boolean}\n     */\n    Store.prototype.setOrUpdateEntry = function (key, value) {\n        var _a;\n        // if entry does not exist in store\n        if (!this.entryExists(key)) {\n            var entry = new store_entry_class_1.StoreEntryClass(value);\n            if (key.namespace) {\n                this.namespaceStore[key.namespace] = (_a = {}, _a[key.key] = entry, _a);\n            }\n            else {\n                this.store[key.key] = entry;\n            }\n        }\n        else {\n            // if entry exist in store\n            if (key.namespace) {\n                this.namespaceStore[key.namespace][key.key].update(value);\n            }\n            else {\n                this.store[key.key].update(value);\n            }\n        }\n    };\n    return Store;\n}());\nexports.Store = Store;\n//# sourceMappingURL=store.module.js.map\n\n//# sourceURL=webpack:///./dist/modules/store/store.module.js?");

/***/ })

/******/ });