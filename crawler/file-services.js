// @flow
import { readFile } from 'fs-promise';
import logger from './logger';

export const createdBotsFilePath = `${__dirname}/../storage/created-bots.json`;
export const resultsFilePath = `${__dirname}/../storage/results.json`;

export const resultsService = () => new Promise((resolve: () => void, reject: () => void) => {
    readFile(resultsFilePath, { encoding: 'utf8' })
        .then((results: string) => resolve(JSON.parse(results)))
        .catch((err: Error) => {
            logger.error(err);
            reject(new Error('Trouble reading results from file, check logs'));
        });
});

export const readBotsService = () => new Promise((resolve: () => void, reject: () => void) => {
    readFile(createdBotsFilePath, { encoding: 'utf8' })
        .then((createdBotsJSON: string) => resolve(JSON.parse(createdBotsJSON)))
        .catch((err: Error) => {
            logger.error(err);
            reject(new Error('Trouble reading bots from file, check logs'));
        });
});
