import {StoreEntryKey} from './store-entry-key';
import {IStoreEntryKeyConfig, StoreEntryKeySubstitute} from './store-entry-key.interface';

describe('BaseStore entry key', () => {
    it('should by default have no values', () => {
        const key = new StoreEntryKey();
        expect(typeof key.key).toEqual('undefined');
        expect(typeof key.namespace).toEqual('undefined');
    });
    it('should be valid when constructed with string value', () => {
        const keyValue = 'someKey';
        const key = new StoreEntryKey(keyValue);
        expect(key.key).toEqual(keyValue);
        expect(typeof key.namespace).toEqual('undefined');
    });
    it('should be valid when constructed with entry config object', () => {
        const configs: IStoreEntryKeyConfig[] = [
            {key: 'someKey'},
            {namespace: 'someNamespace', key: 'someKey'}
        ];
        configs.forEach((config) => {
            const key = new StoreEntryKey(config);
            expect(key.key).toEqual(config.key);
            expect(key.namespace).toEqual(config.namespace);
        });
    });
    it('should throw error when entry config provided with invalid set of values', () => {
        const configs: any[] = [
            {namespace: 'someNamespace'},
            {}
        ];
        configs.forEach((config) => {
            try {
                const key = new StoreEntryKey(config);
            } catch (error) {
                expect(error).toBeTruthy();
            }
        });
    });
    it('should be valid when constructed with another base-store entry key object', () => {
        const configs: StoreEntryKeySubstitute[] = [
            'someKey',
            {key: 'someKey'},
            {namespace: 'someNamespace', key: 'someKey'}
        ];
        configs.forEach((config) => {
            const key = new StoreEntryKey(config);
            expect(key).toBeTruthy();

            expect(key.key).toEqual(typeof config === 'string' ? config : config.key);

            if (typeof config !== 'string' && config.namespace) {
                expect(key.namespace).toEqual(config.namespace);
            }
        });
    });
});
