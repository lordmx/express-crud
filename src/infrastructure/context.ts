import { injectable, inject } from 'inversify';
import { Writer, Reader } from 'nsqjs';
import * as events from 'events';

import TYPES from '../types';
import Config from '../config';

@injectable()
export class Context {
    @inject(TYPES.EventEmitter) public eventEmitter: events.EventEmitter;
    @inject(TYPES.Writer) public writer: Writer;
    @inject(TYPES.Reader) public reader: Reader;
    @inject(TYPES.Config) public config: Config;
}