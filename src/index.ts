import 'source-map-support/register';
import 'dotenv/config';

import {App} from './App';

const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';
const version = process.env.API_VER || '1';

new App(host, port, version);