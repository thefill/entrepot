import {StoreEntryKey, StoreEntryKeySubstitute} from '../store-entry-key';
// TODO: implement tests
import {generateTestValues, testKeys} from '../utils';
import {Emitter} from './emitter';
import {EventTypes} from './emitter.interface';

/**
 * Emitter with setup to tests
 */
class EmitterMock extends Emitter {
    // set emit to public to make tests
    public emit(
        event: EventTypes,
        objectKey: StoreEntryKey,
        ...args: any[]
    ): void{
        super.emit(event, objectKey, ...args);
    }
}

describe('Emitter', () => {
    let emitter: EmitterMock;
    let primitiveValues: Array<string | number>;
    let arrays: Array<Array<string | number | Array<string | number> | object>>;
    let objects: object[];

    const keys = testKeys;
    const eventTypes = Object.keys(EventTypes).map((type) => {
        return EventTypes[type];
    });

    beforeEach(() => {
        emitter = new EmitterMock();
        primitiveValues = generateTestValues('primitive');
        arrays = generateTestValues('array');
        objects = generateTestValues('object');
    });

    describe('should allow to set listener', () => {
        const assertSetListener = (
            key?: StoreEntryKeySubstitute,
            eventType?: EventTypes
        ) => {
            const broadcastedEventType = eventType ? eventType : EventTypes.ALL;
            const broadcastedKey = key ? new StoreEntryKey(key) : Emitter.anyKeyOrNamespace;
            const broadcastedValue = 'test';

            emitter.on(
                eventType,
                (receivedEventType, receivedKey, receivedValue) => {
                    expect(receivedEventType).toEqual(broadcastedEventType);
                    expect(receivedKey).toEqual(broadcastedKey);
                    expect(receivedValue).toEqual(broadcastedValue);
                },
                key
            );

            emitter.emit(
                broadcastedEventType,
                broadcastedKey,
                broadcastedValue
            );
        };

        describe('for specific key', () => {
            Object.keys(keys).forEach((keyLabel) => {
                describe(`using ${keyLabel} as an identifier`, () => {
                    describe('for specific event', () => {
                        eventTypes.forEach((event) => {
                            it(`for event of type ${event}`, () => {
                                assertSetListener(keys[keyLabel], event);
                            });
                        });
                    });
                    it('without providing event', () => {
                        assertSetListener(keys[keyLabel], undefined);
                    });
                });
            });
        });
        describe('without providing key', () => {
            describe('for specific event', () => {
                eventTypes.forEach((event) => {
                    it(`for event of type ${event}`, () => {
                        assertSetListener(undefined, event);
                    });
                });
            });
            it('without providing event', () => {
                assertSetListener(undefined, undefined);
            });
        });
    });

    describe('should emit events to listeners', () => {
        // Local assertion callback
        const assertEmit = (
            emitsCount: number,
            expectedCount: number,
            listeningMethod: 'on' | 'once',
            key?: StoreEntryKeySubstitute,
            eventType?: EventTypes,
            values?: any[]
        ) => {
            const broadcastedEventType = eventType ? eventType : EventTypes.ALL;
            const broadcastedKey = key ? new StoreEntryKey(key) : Emitter.anyKeyOrNamespace;
            const broadcastedValue = values;
            let emittedCount = 0;

            emitter[listeningMethod](
                eventType,
                (receivedEventType, receivedKey, receivedValue) => {
                    expect(receivedEventType).toEqual(broadcastedEventType);
                    expect(receivedKey).toEqual(broadcastedKey);
                    expect(receivedValue).toEqual(broadcastedValue);
                    emittedCount++;
                },
                key
            );

            for (let i = 0; i < emitsCount; i++) {
                emitter.emit(
                    broadcastedEventType,
                    broadcastedKey,
                    broadcastedValue
                );
            }

            expect(emittedCount).toEqual(expectedCount);

        };

        const scenarios: Array<{
            emitsCount: number,
            expectedCount: number,
            listeningMethod: 'on' | 'once',
            title: string
        }> = [{
            emitsCount: 3,
            expectedCount: 3,
            listeningMethod: 'on',
            title: 'should emit multiple times'
        }, {
            emitsCount: 3,
            expectedCount: 1,
            listeningMethod: 'once',
            title: 'should emit once'
        }];

        scenarios.forEach((scenario) => {
            describe(scenario.title, () => {
                Object.keys(keys).forEach((keyLabel) => {
                    describe('for specific event', () => {
                        eventTypes.forEach((event) => {
                            describe(`for event of type ${event}`, () => {
                                describe(`with primitive value`, () => {
                                    it(`using ${keyLabel} as an identifier`, () => {
                                        assertEmit(
                                            scenario.emitsCount,
                                            scenario.expectedCount,
                                            scenario.listeningMethod,
                                            keys[keyLabel],
                                            event,
                                            primitiveValues
                                        );
                                    });
                                });

                                describe(`with array value`, () => {
                                    it(`using ${keyLabel} as an identifier`, () => {
                                        assertEmit(
                                            scenario.emitsCount,
                                            scenario.expectedCount,
                                            scenario.listeningMethod,
                                            keys[keyLabel],
                                            event,
                                            arrays
                                        );
                                    });
                                });

                                describe(`with object value`, () => {
                                    it(`using ${keyLabel} as an identifier`, () => {
                                        assertEmit(
                                            scenario.emitsCount,
                                            scenario.expectedCount,
                                            scenario.listeningMethod,
                                            keys[keyLabel], event,
                                            objects
                                        );
                                    });
                                });

                                describe(`without values`, () => {
                                    it(`using ${keyLabel} as an identifier`, () => {
                                        assertEmit(
                                            scenario.emitsCount,
                                            scenario.expectedCount,
                                            scenario.listeningMethod,
                                            keys[keyLabel], event,
                                            undefined
                                        );
                                    });
                                });
                            });
                        });
                    });
                    describe('without providing event', () => {
                        describe(`with primitive value`, () => {
                            it(`using ${keyLabel} as an identifier`, () => {
                                assertEmit(
                                    scenario.emitsCount,
                                    scenario.expectedCount,
                                    scenario.listeningMethod,
                                    keys[keyLabel],
                                    undefined,
                                    primitiveValues
                                );
                            });
                        });

                        describe(`with array value`, () => {
                            it(`using ${keyLabel} as an identifier`, () => {
                                assertEmit(
                                    scenario.emitsCount,
                                    scenario.expectedCount,
                                    scenario.listeningMethod,
                                    keys[keyLabel],
                                    undefined,
                                    arrays
                                );
                            });
                        });

                        describe(`with object value`, () => {
                            it(`using ${keyLabel} as an identifier`, () => {
                                assertEmit(
                                    scenario.emitsCount,
                                    scenario.expectedCount,
                                    scenario.listeningMethod,
                                    keys[keyLabel],
                                    undefined,
                                    objects
                                );
                            });
                        });

                        describe(`without values`, () => {
                            it(`using ${keyLabel} as an identifier`, () => {
                                assertEmit(
                                    scenario.emitsCount,
                                    scenario.expectedCount,
                                    scenario.listeningMethod,
                                    keys[keyLabel],
                                    undefined,
                                    undefined
                                );
                            });
                        });
                    });
                });
            });
        });

    });

    describe('should emit events to listeners', () => {
        // Local assertion callback
        const assertRemoval = (
            key?: StoreEntryKeySubstitute,
            eventType?: EventTypes
        ) => {
            const broadcastedEventType = eventType ? eventType : EventTypes.ALL;
            const broadcastedKey = key ? new StoreEntryKey(key) : Emitter.anyKeyOrNamespace;
            const broadcastedValue = 'test';
            let emittedCount = 0;
            const listener = () => {
                emittedCount++;
            };

            emitter.on(eventType, listener, key);

            emitter.removeListener(broadcastedEventType, listener, key);

            for (let i = 0; i < 3; i++) {
                emitter.emit(
                    broadcastedEventType,
                    broadcastedKey,
                    broadcastedValue
                );
            }

            expect(emittedCount).toEqual(0);

        };

        describe(scenario.title, () => {
            Object.keys(keys).forEach((keyLabel) => {
                describe('for specific event', () => {
                    eventTypes.forEach((event) => {
                        describe(`for event of type ${event}`, () => {
                            describe(`with primitive value`, () => {
                                it(`using ${keyLabel} as an identifier`, () => {
                                    assertRemoval(
                                        keys[keyLabel],
                                        event
                                    );
                                });
                            });

                        });
                    });
                });
                describe('without providing event', () => {
                    it(`using ${keyLabel} as an identifier`, () => {
                        assertRemoval(
                            keys[keyLabel],
                            undefined
                        );
                    });
                });
            });
        });

    });
    // describe('should remove specific listeners', () => {
    // });
    // describe('should remove all listeners', () => {
    // });
    // public on(
    //         event: EventTypes,
    //         listener: StoreEventListener,
    //         keyOrNamespace: StoreEntryKeySubstitute = Emitter.anyKeyOrNamespace
    // ): void {
    //         public once(
    //             event: EventTypes = EventTypes.ALL,
    //         listener: StoreEventListener,
    //         keyOrNamespace: StoreEntryKeySubstitute = Emitter.anyKeyOrNamespace
    // ): void {
    //         public removeListener(
    //             event: EventTypes,
    //         listener: StoreEventListener,
    //         keyOrNamespace: StoreEntryKeySubstitute = Emitter.anyKeyOrNamespace
    // ): void {
    //         removeAllListeners()
    //         protected emit(
    //             event: EventTypes,
    //         objectKey: StoreEntryKey,
    // ...args: any[]
    // ): void {
});
