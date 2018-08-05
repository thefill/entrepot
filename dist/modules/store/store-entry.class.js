"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Single store entry
 */
var StoreEntryClass = /** @class */ (function () {
    function StoreEntryClass(value) {
        // TODO: emit changes from single entry??
        // current step in history we are on
        this.currentStep = 0;
        // history of value
        this.history = [];
        this.history.push(value);
    }
    /**
     * Update history with new value, if current step not the last index
     * of history all entries past this point are removed
     * @param {T} value
     * @returns {number} Current step value
     */
    StoreEntryClass.prototype.update = function (value) {
        // Remove all entries that are in front of current step
        this.history = this.history.slice(0, this.currentStep);
        return this.history.push(value);
    };
    return StoreEntryClass;
}());
exports.StoreEntryClass = StoreEntryClass;
//# sourceMappingURL=store-entry.class.js.map