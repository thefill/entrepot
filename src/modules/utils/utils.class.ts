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
            return UtilsClass.deepClone(value);
        }

        return value;
    }

    /**
     * Deep clone object properties
     * @param {object} source
     * @returns {object}
     */
    public static deepClone(source: object): object {
        const target = {};
        for (const properties in source) {
            if (source.hasOwnProperty(properties)) {
                target[properties] = source[properties];
            }
        }
        return target;
    }
}
