import {Store} from './store';

describe('Store', () => {
    let store: Store;

    beforeEach(() => {
        store = new Store();
    });

    it('should be created corectly', () => {
        expect(store).toBeTruthy();
    });

});
