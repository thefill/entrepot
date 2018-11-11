import {StoreEntryKey, StoreEntryKeySubstitute} from '../store-entry-key';
// TODO: implement tests
import {generateTestValues, testKeys} from '../utils';
import {Emitter} from './emitter';
import {EventTypes, StoreEventListener} from './emitter.interface';

/**
 * Emitter with setup to tests
 */
class EmitterMock extends Emitter {
    // set emit to public to make tests
    public emit(
        event: EventTypes,
        objectKey: StoreEntryKey,
        ...args: any[]
    ): void {
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

    const setup = () => {
        emitter = new EmitterMock();
        primitiveValues = generateTestValues('primitive');
        arrays = generateTestValues('array');
        objects = generateTestValues('object');
    };

    describe('should allow to set listener', () => {
        beforeAll(setup);

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
        beforeEach(setup);

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
            const listener = jest.fn((receivedEventType, receivedKey, receivedValue) => {
                expect(receivedEventType).toEqual(broadcastedEventType);
                expect(receivedKey).toEqual(broadcastedKey);
                expect(receivedValue).toEqual(broadcastedValue);
            });

            emitter[listeningMethod](
                eventType,
                listener,
                key
            );

            for (let i = 0; i < emitsCount; i++) {
                emitter.emit(
                    broadcastedEventType,
                    broadcastedKey,
                    broadcastedValue
                );
            }

            expect(listener).toHaveBeenCalledTimes(expectedCount);

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

    describe('should remove specific listeners', () => {
        beforeAll(setup);

        // Local assertion callback
        const assertRemoval = (
            key?: StoreEntryKeySubstitute,
            eventType?: EventTypes
        ) => {
            const broadcastedEventType = eventType ? eventType : EventTypes.ALL;
            const broadcastedKey = key ? new StoreEntryKey(key) : Emitter.anyKeyOrNamespace;
            const broadcastedValue = 'test';
            const listener = jest.fn();

            emitter.on(eventType, listener, key);

            emitter.removeListener(broadcastedEventType, listener, key);

            for (let i = 0; i < 3; i++) {
                emitter.emit(
                    broadcastedEventType,
                    broadcastedKey,
                    broadcastedValue
                );
            }

            expect(listener).not.toBeCalled();

        };

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

    describe('should remove all listeners', () => {
        beforeEach(setup);

        const setupListener = (
            providedListener: StoreEventListener,
            key?: StoreEntryKeySubstitute,
            eventType?: EventTypes
        ) => {
            const broadcastedEventType = eventType ? eventType : EventTypes.ALL;
            const broadcastedKey = key ? new StoreEntryKey(key) : Emitter.anyKeyOrNamespace;

            emitter.on(eventType, providedListener, key);
        };

        // Local assertion callback
        const assertAllRemoval = (
            key?: StoreEntryKeySubstitute,
            eventType?: EventTypes
        ) => {
            const broadcastedEventType = eventType ? eventType : EventTypes.ALL;
            const broadcastedKey = key ? new StoreEntryKey(key) : Emitter.anyKeyOrNamespace;
            const broadcastedValue = 'test';

            // Set common listener spy
            const listener = jest.fn();

            // fill emitter with listeners
            Object.keys(keys).forEach((keyLabel) => {
                eventTypes.forEach((event) => {
                    setupListener(
                        listener,
                        keys[keyLabel],
                        event
                    );

                });
                setupListener(
                    listener,
                    keys[keyLabel],
                    undefined
                );
            });

            // assert removal
            emitter.removeAllListeners();

            for (let i = 0; i < 3; i++) {
                emitter.emit(
                    broadcastedEventType,
                    broadcastedKey,
                    broadcastedValue
                );
            }

            expect(listener).not.toBeCalled();

        };

        Object.keys(keys).forEach((keyLabel) => {
            describe('for specific event', () => {
                eventTypes.forEach((event) => {
                    describe(`for event of type ${event}`, () => {
                        describe(`with primitive value`, () => {
                            it(`using ${keyLabel} as an identifier`, () => {
                                assertAllRemoval(
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
                    assertAllRemoval(
                        keys[keyLabel],
                        undefined
                    );
                });
            });
        });

    });
});
