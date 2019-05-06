import {generateTestValues, testKeys, Utils} from '../utils';
import {Search} from './search';
import {HistoryStore} from '../history-store';

describe('Search', () => {
    let store: HistoryStore & Search;
    const StoreWithSearch = Utils.mixin(HistoryStore, [Search]);
    let primitiveValues: Array<string | number>;
    let arrays: Array<Array<string | number | Array<string | number> | object>>;
    let objects: object[];

    const keys = testKeys;

    beforeEach(() => {
        store = new StoreWithSearch();
        primitiveValues = generateTestValues('primitive');
        arrays = generateTestValues('array');
        objects = generateTestValues('object');
    });

    it('test', () => {
        expect(1).toBeTruthy();
    });
});
