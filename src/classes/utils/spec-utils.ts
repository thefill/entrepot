/**
 * Generate set of values for provided types
 * @returns {any}
 */
export function generateTestValues(type: 'primitive' | 'array' | 'object'): any {
    let value: any;

    switch (type) {
        case 'primitive':
            value = [
                123,
                'string'
            ];
            break;
        case 'array':
            value = [
                [1, 2, 3],
                ['a', 'b', 'c'],
                [{a: 1, b: 2}, {c: 1, d: 2}],
                [[1, 2, 3], ['a', 'b', 'c']]
            ];
            break;
        case 'object':
            value = [
                {a: 1, b: 2},
                {c: 1, d: 2},
                {e: {a: 1, b: 2}, f: {c: 1, d: 2}}
            ];
            break;
    }

    return value;
}
