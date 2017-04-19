// @flow
import type { $Request, $Response } from 'express';
import HTTPStatus from 'http-status';
import { writeFile } from 'fs-promise';
import { readBotsService, createdBotsFilePath } from '../file-services';
import logger from '../logger';

export const botsMapToArray = (botsMap: *) => Object.keys(botsMap).map((key: string) => ({
    title: key,
    ...botsMap[key],
}));

export const createBot = (req: $Request, res: $Response) => {
    const { currentBrand, currentState, currentYearFrom, currentYearTo, currentModel, currentBodyStyle,
        title } = req.body;

    readBotsService()
        .then((createdBots: *) => {
            if (typeof createdBots[title] === 'undefined') {
                const updatedBots = {
                    ...createdBots,
                    [title]: {
                        currentBrand,
                        currentState,
                        currentYearFrom,
                        currentYearTo,
                        currentModel,
                        currentBodyStyle,
                    },
                };

                writeFile(createdBotsFilePath, JSON.stringify(updatedBots))
                    .then(() => res.send('OK'))
                    .catch(logger.error);
            } else {
                res.status(HTTPStatus.CONFLICT).send(`Already have ${title}`);
            }
        })
        .catch((err: Error) => res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err));
};

export const getAllBots = (req: $Request, res: $Response) => {
    readBotsService()
        .then((createdBots: *) => {
            if (typeof createdBots === 'object') {
                res.send(botsMapToArray(createdBots));
            } else {
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send('unexpected file storage format in created-bots.json');
            }
        })
        .catch((err: Error) => res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err));
};
