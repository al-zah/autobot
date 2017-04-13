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

// app.get('/*', (req: express$Request, res: express$Response, next: express$NextFunction): void => {
//     if (req.baseUrl.includes('/api')) {
//         next();
//     } else {
//         res.sendFile(path.join(__dirname, '../dist/index.html'));
//     }
// });
app.use(express.static(path.join(__dirname, '../dist')));

app.use(express.static(path.join(__dirname, '../assets')));

app.listen(port, (): Server => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
