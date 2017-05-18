// @flow
import path from 'path';
import express from 'express';
import compression from 'compression';
import getPort from './helpers/getPort';
import sharedMiddlewares from './shared';

const app: express$Application = express();
const port: number | string = getPort();

app.use(compression());

sharedMiddlewares(app);

app.use(express.static(path.join(__dirname, '../dist')));

app.use(express.static(path.join(__dirname, '../assets')));

app.use('/wakemydyno.txt', (req, res) => res.send('OK!'));

app.listen(port, (): Server => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
