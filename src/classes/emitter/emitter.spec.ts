import {SpecUtils} from '../spec-utils';
import {Emitter} from './emitter';
import {EventTypes} from '../../interfaces/emitter/emitter.interface';

const defaultListenerKey = 'default_key';

/**
 * Emitter with setup to tests
 */
class EmitterMock extends Emitter {
    public defaultListenerKey = defaultListenerKey;

    // set emit to public to make tests
    public emit(
        event: EventTypes,
        listenerKey: string,
        ...args: any[]
    ): void{
        super.emit(event, listenerKey, ...args);
    }
}

describe('Emitter', () => {
    let primitiveValues: Array<string | number>;
    let arrays: Array<Array<string | number | Array<string | number> | object>>;
    let objects: object[];

    const eventTypes = Object.keys(EventTypes).map((type) => {
        return EventTypes[type];
    });

    const setup = () => {
        primitiveValues = SpecUtils.generateTestValues('primitive');
        arrays = SpecUtils.generateTestValues('array');
        objects = SpecUtils.generateTestValues('object');
    };

    it('should by default be enabled', () => {
        const enabledEmitter = new EmitterMock();
        expect(enabledEmitter.emitterEnabled).toBeTruthy();
    });

    it('should be enabled if config says so', () => {
        const enabledEmitter = new EmitterMock({
            emitterEnabled: true
        });
        expect(enabledEmitter.emitterEnabled).toBeTruthy();
    });

    it('should be disabled if config says so', () => {
        const disabledEmitter = new EmitterMock({
            emitterEnabled: false
        });
        expect(disabledEmitter.emitterEnabled).toBeFalsy();
    });

    [true, false].forEach((emitterEnabled) => {

        describe(`should ${emitterEnabled ? '' : 'not '}allow to set listener`, () => {
            beforeAll(setup);

            describe('for string key', () => {
                describe('for specific event', () => {
                    eventTypes.forEach((event) => {
                        it(`for event of type ${event}`, () => {
                            assertSetListener(emitterEnabled, 'some_key', event);
                        });
                    });
                });
                it('without providing event', () => {
                    assertSetListener(emitterEnabled, 'some_key', undefined);
                });
            });
            describe('without providing key', () => {
                describe('for specific event', () => {
                    eventTypes.forEach((event) => {
                        it(`for event of type ${event}`, () => {
                            assertSetListener(emitterEnabled, undefined, event);
                        });
                    });
                });
                it('without providing event', () => {
                    assertSetListener(emitterEnabled, undefined, undefined);
                });
            });
        });

        describe(`should ${emitterEnabled ? '' : 'not '}emit events to listeners`, () => {
            beforeEach(setup);

            const scenarios: Array<{
                emitsCount: number,
                expectedCount: number,
                listeningMethod: 'on' | 'once',
                title: string
            }> = [{
                emitsCount: 3,
                expectedCount: emitterEnabled ? 3 : 0,
                listeningMethod: 'on',
                title: `should ${emitterEnabled ? '' : 'not '}emit multiple times`
            }, {
                emitsCount: 3,
                expectedCount: emitterEnabled ? 1 : 0,
                listeningMethod: 'once',
                title: `should ${emitterEnabled ? '' : 'not '}emit once`
            }];

            scenarios.forEach((scenario) => {
                describe(scenario.title, () => {

                    describe('for specific event', () => {
                        eventTypes.forEach((event) => {
                            describe(`for event of type ${event}`, () => {
                                it(`with primitive value`, () => {
                                    assertEmit(
                                        emitterEnabled,
                                        scenario.emitsCount,
                                        scenario.expectedCount,
                                        scenario.listeningMethod,
                                        'some_key',
                                        event,
                                        primitiveValues
                                    );
                                });

                                it(`with array value`, () => {
                                    assertEmit(
                                        emitterEnabled,
                                        scenario.emitsCount,
                                        scenario.expectedCount,
                                        scenario.listeningMethod,
                                        'some_key',
                                        event,
                                        arrays
                                    );
                                });

                                it(`with object value`, () => {
                                    assertEmit(
                                        emitterEnabled,
                                        scenario.emitsCount,
                                        scenario.expectedCount,
                                        scenario.listeningMethod,
                                        'some_key',
                                        event,
                                        objects
                                    );
                                });

                                it(`without values`, () => {
                                    assertEmit(
                                        emitterEnabled,
                                        scenario.emitsCount,
                                        scenario.expectedCount,
                                        scenario.listeningMethod,
                                        'some_key',
                                        event,
                                        undefined
                                    );
                                });
                            });
                        });
                    });
                    describe('without providing event', () => {
                        it(`with primitive value`, () => {
                            assertEmit(
                                emitterEnabled,
                                scenario.emitsCount,
                                scenario.expectedCount,
                                scenario.listeningMethod,
                                'some_key',
                                undefined,
                                primitiveValues
                            );
                        });

                        it(`with array value`, () => {
                            assertEmit(
                                emitterEnabled,
                                scenario.emitsCount,
                                scenario.expectedCount,
                                scenario.listeningMethod,
                                'some_key',
                                undefined,
                                arrays
                            );
                        });

                        it(`with object value`, () => {
                            assertEmit(
                                emitterEnabled,
                                scenario.emitsCount,
                                scenario.expectedCount,
                                scenario.listeningMethod,
                                'some_key',
                                undefined,
                                objects
                            );
                        });

                        it(`without values`, () => {
                            assertEmit(
                                emitterEnabled,
                                scenario.emitsCount,
                                scenario.expectedCount,
                                scenario.listeningMethod,
                                'some_key',
                                undefined,
                                undefined
                            );
                        });
                    });
                });
            });
        });

        describe('should remove specific listeners', () => {
            beforeAll(setup);

            describe('for specific event', () => {
                eventTypes.forEach((event) => {
                    describe(`for event of type ${event}`, () => {
                        it(`with primitive value`, () => {
                            assertRemoval(emitterEnabled, 'some_key', event);
                        });
                    });
                });
            });

            it('without providing event', () => {
                assertRemoval(emitterEnabled, 'some_key', undefined);
            });

        });

        describe('should remove all listeners', () => {
            beforeEach(setup);

            describe('for specific event', () => {
                eventTypes.forEach((event) => {
                    describe(`for event of type ${event}`, () => {
                        it(`with primitive value`, () => {
                            assertAllRemoval(emitterEnabled, eventTypes, 'some_key', event);
                        });

                    });
                });
            });

            it('without providing event', () => {
                assertAllRemoval(emitterEnabled, eventTypes, 'some_key', undefined);
            });

        });
    });
});

/**
 * Set listener assertion callback
 * @param {boolean} emitterEnabled
 * @param {string} listenerKey
 * @param {EventTypes} eventType
 */
function assertSetListener(emitterEnabled: boolean, listenerKey?: string, eventType?: EventTypes){
    const emitter = new EmitterMock({
        emitterEnabled: emitterEnabled
    });
    const broadcastedEventType = eventType ? eventType : EventTypes.ALL;
    const broadcastedKey = listenerKey ? listenerKey : emitter.defaultListenerKey;
    const broadcastedValue = 'test';

    emitter.on(
        eventType,
        (receivedEventType, receivedKey, receivedValue) => {
            expect(receivedEventType).toEqual(broadcastedEventType);
            expect(receivedKey).toEqual(broadcastedKey);
            expect(receivedValue).toEqual(broadcastedValue);
        },
        listenerKey
    );

    emitter.emit(
        broadcastedEventType,
        broadcastedKey,
        broadcastedValue
    );
}

/**
 * Emit assertion callback
 * @param {boolean} emitterEnabled
 * @param {number} emitsCount
 * @param {number} expectedCount
 * @param {"on" | "once"} listeningMethod
 * @param {string} listenerKey
 * @param {EventTypes} eventType
 * @param {any[]} values
 */
function assertEmit(
    emitterEnabled: boolean,
    emitsCount: number,
    expectedCount: number,
    listeningMethod: 'on' | 'once',
    listenerKey?: string,
    eventType?: EventTypes,
    values?: any[]
){
    const emitter = new EmitterMock({
        emitterEnabled: emitterEnabled
    });
    const broadcastedEventType = eventType ? eventType : EventTypes.ALL;
    const broadcastedKey = listenerKey ? listenerKey : emitter.defaultListenerKey;
    const broadcastedValue = values;
    const listener = jest.fn((receivedEventType, receivedKey, receivedValue) => {
        expect(receivedEventType).toEqual(broadcastedEventType);
        expect(receivedKey).toEqual(broadcastedKey);
        expect(receivedValue).toEqual(broadcastedValue);
    });

    emitter[listeningMethod](eventType, listener, listenerKey);

    for (let i = 0; i < emitsCount; i++) {
        emitter.emit(
            broadcastedEventType,
            broadcastedKey,
            broadcastedValue
        );
    }

    expect(listener).toHaveBeenCalledTimes(expectedCount);
}

/**
 * Removal assertion callback
 * @param {boolean} emitterEnabled
 * @param {string} listenerKey
 * @param {EventTypes} eventType
 */
function assertRemoval(emitterEnabled: boolean, listenerKey?: string, eventType?: EventTypes){
    const emitter = new EmitterMock({
        emitterEnabled: emitterEnabled
    });
    const broadcastedEventType = eventType ? eventType : EventTypes.ALL;
    const broadcastedKey = listenerKey ? listenerKey : emitter.defaultListenerKey;
    const broadcastedValue = 'test';
    const listener = jest.fn();

    emitter.on(eventType, listener, listenerKey);

    emitter.removeListener(broadcastedEventType, listener, listenerKey);

    for (let i = 0; i < 3; i++) {
        emitter.emit(broadcastedEventType, broadcastedKey, broadcastedValue);
    }

    expect(listener).not.toBeCalled();
}

/**
 * All events removal assertion callback
 * @param {boolean} emitterEnabled
 * @param {EventTypes[]} eventTypes
 * @param {string} listenerKey
 * @param {EventTypes} eventType
 */
function assertAllRemoval(
    emitterEnabled: boolean,
    eventTypes: EventTypes[],
    listenerKey?: string,
    eventType?: EventTypes
){
    const emitter = new EmitterMock({
        emitterEnabled: emitterEnabled
    });
    const broadcastedEventType = eventType ? eventType : EventTypes.ALL;
    const broadcastedKey = listenerKey ? listenerKey : emitter.defaultListenerKey;
    const broadcastedValue = 'test';

    // Set common listener spy
    const listener = jest.fn();

    // fill emitter with listeners
    eventTypes.forEach((event) => {
        event = event ? event : EventTypes.ALL;
        emitter.on(event, listener, 'some_key');
    });

    emitter.on(undefined, listener, 'some_key');

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
}
