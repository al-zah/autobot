// @flow
import express from 'express';
import bodyParser from 'body-parser';
import { fetcher } from './horn';
import getPort from './getPort';

const DELAY = 60000;

setInterval(fetcher, DELAY);

const app: express$Application = express();

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/health', (req: express$Request, res: express$Response): void => res.end('OK'));

const port: number = getPort();

app.listen(port, (): Server => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
