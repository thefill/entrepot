import {StoreEntryClass} from './store-entry.class';

describe('Store entry', () => {
    const value = 'some value';

    it('Should be created with default position', () => {
        const entry = new StoreEntryClass(value);
        expect(entry.currentPosition).toEqual(0);
    });

    it('Should add value passed during creation to the history', () => {
        const entry = new StoreEntryClass(value);
        expect(entry.history.length).toEqual(1);
        expect(entry.history[0]).toEqual(value);
    });

});
