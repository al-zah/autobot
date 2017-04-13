// @flow
/* eslint-disable no-magic-numbers, import/no-extraneous-dependencies */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';
import sharedMiddlewares from '../server/shared';

const app: express$Application = express();

const devServer = (expressApp: express$Application): void => {
    const compiler = webpack(config);
    const devMiddleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        historyApiFallback: true,
        noInfo: true,
        quiet: true,
    });


    expressApp.use(devMiddleware);
    expressApp.use(webpackHotMiddleware(compiler));

    expressApp.use(express.static(path.join(__dirname, '../dist')));
    expressApp.use(express.static(path.join(__dirname, '../assets')));
    expressApp.use('*', (req: express$Request, res: express$Response, next: express$NextFunction): void => {
        const filename = path.join(compiler.outputPath, 'index.html');

        if (req.baseUrl.indexOf('/api/') !== -1) {
            next();
        } else {
            compiler.outputFileSystem.readFile(filename, (err: ?ErrnoError, result: Buffer): void => {
                if (err) {
                    next(err);
                }
                res.set('content-type', 'text/html');
                res.send(result);
                res.end();
            });
        }
    });
};

devServer(app);

sharedMiddlewares(app);

app.listen(4444, () => {
    console.log(`${process.env.NODE_ENV} server running on port 4444`);
});

export default devServer;
