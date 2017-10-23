// @flow
import { MongoClient } from 'mongodb';
import logger from './logger';

const mongoAuth = {
    user: 'a',
    pass: 123,
};
const mongoUrl = `mongodb://${mongoAuth.user}:${mongoAuth.pass}@ds133044.mlab.com:33044/autobot1`;
const RESULTS = 'results';
const BOTS = 'bots';
let connection = null;

const dbConnect = () => new Promise((resolve: () => void, reject: () => void) => {
    if (connection === null) {
        return MongoClient.connect(mongoUrl, (err: ?Error, db: *) => {
            if (err !== null) reject(err);

            connection = db;
            resolve(db);
        });
    }

    return resolve(connection);
});

const dbErrorHandler = (error: ?Error, reject: () => void) => {
    logger.error(error);
    reject(new Error('Troubles with db, check logs'));
};

export const readResultsService = () => new Promise((resolve: () => void, reject: () => void) => {
    dbConnect()
        .then((db: *) => {
            db.collection(RESULTS, (err: ?Error, resultsCollection: *) => {
                if (err) return dbErrorHandler(err, reject);

                return resultsCollection.find().toArray((err2: ?Error, results: *) => {
                    if (err) return dbErrorHandler(err2, reject);

                    return resolve(results);
                });
            });
        })
        .catch(dbErrorHandler);
});

export const writeResultsService = (botTitle: string, value: *) =>
    new Promise((resolve: () => void, reject: () => void) => dbConnect()
        .then((db: *) => {
            db.collection(RESULTS, (err: ?Error, resultsCollection: *) => {
                if (err) return dbErrorHandler(err, reject);

                return resultsCollection.deleteOne({ title: botTitle })
                    .then(() => {
                        resultsCollection.insertOne({
                            title: botTitle,
                            ...value,
                        }).then(resolve).catch(reject);
                    });
            });
        })
        .catch(dbErrorHandler),
    );

export const readBotsService = () => new Promise((resolve: () => void, reject: () => void) => {
    dbConnect()
        .then((db: *) => {
            db.collection(BOTS, (err: ?Error, botsCollection: *) => {
                if (err) return dbErrorHandler(err, reject);

                return botsCollection.find().toArray((err2: ?Error, bots: *) => {
                    if (err) return dbErrorHandler(err2, reject);

                    return resolve(bots);
                });
            });
        })
        .catch(dbErrorHandler);
});

export const writeBotsService = (botTitle: string, value: *) =>
    new Promise((resolve: () => void, reject: () => void) => dbConnect()
        .then((db: *) => {
            db.collection(BOTS, (err: ?Error, botsCollection: *) => {
                if (err) return dbErrorHandler(err, reject);

                return botsCollection.deleteOne({ title: botTitle })
                    .then(() => {
                        botsCollection.insertOne({
                            title: botTitle,
                            ...value,
                        }).then(resolve).catch(reject);
                    });
            });
        })
        .catch(dbErrorHandler),
    );
