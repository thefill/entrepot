/**
 * Various utils
 */
export class Utils {
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
        } else if (typeof value === 'object') {
            return Utils.deepClone(value);
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

    /**
     * Fake multi-inheritance mixin function - perfectly fits into pattern where one composes
     * reusable components by combining simpler partial classes. Achieves this by leveraging
     * mixin function (inspired by like Scala).
     *
     * TS understand hybrid class created with this mixin, allows auto-completion & validation.
     *
     * Most important for this pattern is way we structure additive classes:
     *
     * abstract class ClassA {
     *        public staticMethodA: string;
     *        public methodA() {
     *            return 'valueA';
     *        }
     *    }
     *
     * abstract class ClassB {
     *        public staticMethodB: string;
     *        public methodB() {
     *            return 'valueB';
     *        }
     *    }
     *
     * class ClassC implements ClassA, ClassB {
     *        public staticMethodA;
     *        public staticMethodB;
     *        public methodA: () => string;
     *        public methodB: () => string;
     *
     *        constructor(){
     *            this.staticMethodA = 'staticValueA';
     *            this.staticMethodB = 'staticValueB';
     *        }
     *    }
     * Utils.mixin(ClassC, [ClassA, ClassB]);
     *
     * const newObjectC = new ClassC();
     */
    public static mixin(
        base: any,
        additives: any[]
    ) {

        additives.forEach((additive) => {
            Object.getOwnPropertyNames(additive.prototype).forEach((name) => {
                base.prototype[name] = additive.prototype[name];
            });
        });

        return base;
    }
}
