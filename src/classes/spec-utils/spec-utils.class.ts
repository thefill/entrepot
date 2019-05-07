import {StoreEntryKey, StoreEntryKeySubstitute} from '../../OLD/OLD/store-entry-key';

/**
 * Generate set of values for provided types
 * @returns {any}
 */
export class SpecUtils {

    public static testKeys: { [keyLabel: string]: any } = {
        'string': 'someKey',
        'config object with key': {
            key: 'someKey2'
        },
        'config object with key and namespace': {
            namespace: 'someNamespace',
            key: 'someKey3'
        },
        'config object with string key and existing namespace': {
            namespace: 'someNamespace',
            key: 'someKey4'
        },
        'key object with string default value': new StoreEntryKey('someKey5'),
        'key object with key': new StoreEntryKey({key: 'someKey6'}),
        'key object with key and namespace': new StoreEntryKey(({
            namespace: 'someNamespace2',
            key: 'someKey7'
        })),
        'key object with key and existing namespace': new StoreEntryKey(({
            namespace: 'someNamespace2',
            key: 'someKey8'
        }))
    };

    public static generateTestValues(type: 'primitive' | 'array' | 'object'): any{
        let value: any;

        switch (type){
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
}
