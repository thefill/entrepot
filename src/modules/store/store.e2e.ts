import * as Benchmark from 'benchmark';

xdescribe('Speed', () => {
    // TODO: add benchmark of read/write to the tests
    jest.setTimeout(30000);
    xit('expect', async () => {
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
