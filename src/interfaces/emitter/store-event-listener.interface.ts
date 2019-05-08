import {EventTypes} from '../../enums';

/**
 * Event callback function
 */
export type StoreEventListener = (
    eventType: EventTypes,
    listenerKey: string | void,
    ...args: any[]
) => any | void;
