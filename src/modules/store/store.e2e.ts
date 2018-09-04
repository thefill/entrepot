import * as Benchmark from 'benchmark';
import {StoreEntryKeyClass} from '../store-entry-key';
import {generateTestValues} from '../utils/utils.spec';
import {IStoreConfig, IStoreEntry, IStoreEntryKeyConfig, StoreEntryKeySubstitute} from './store.interface';
import {Store} from './store.module';

xdescribe('Speed', () => {
    // TODO: implement benchmark
    jest.setTimeout(30000);
    fit('expect', async () => {
        const zzz = () => {
            return new Promise((resolve) => {
                const suite = new Benchmark.Suite();
                console.log('start');
                suite.add('RegExp#test', () => {
                        const a = /o/.test('Hello World!');
                    })
                    .add('String#indexOf', () => {
                        const a = 'Hello World!'.indexOf('o') > -1;
                    })
                    // add listeners
                    .on('cycle', (event) => {
                        console.log(String(event.target));
                    })
                    .on('complete', (reseult) => {
                        console.log('Fastest is ' + reseult.filter('fastest').map('name'));
                        expect(true).toBeTruthy();
                        resolve();
                    })
                    // run async
                    .run({async: true});
            });
        };
        await zzz();
    });
});
