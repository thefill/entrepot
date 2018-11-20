import {IBaseStore} from '../base-store';

/**
 * Search functionality for the store
 */
export abstract class Source<T = any> {
    // TODO: implement
    // Sources - are locations to synchronise data with
    // user provides socket connection / post / get url
    // key to entry, function that modifies data (optional) and we synchronise data as it comes or in interval
    // extra we add functions to handle errors like wrong data that dont match schema etc

}
