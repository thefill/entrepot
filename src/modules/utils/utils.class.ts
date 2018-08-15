/**
 * Various utils
 */
export class UtilsClass {
    /**
     * Separate values from their references
     * @param {any} value
     * @return {any}
     */
    public static decoupleValue(value: any): any {
        if (!value) {
            return value;
        }

        if (Array.isArray(value)) {
            return value.slice();
        } else if (typeof value === "object") {
            return Object.assign({}, value);
        }

        return value;
    }
}
