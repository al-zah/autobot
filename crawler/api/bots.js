// @flow
import type { $Request, $Response } from 'express';
import HTTPStatus from 'http-status';
import { readBotsService, writeBotsService } from '../services';
import logger from '../logger';

export const createBot = (req: $Request, res: $Response) => {
    const { currentBrand, currentState, currentYearFrom, currentYearTo, currentModel, currentBodyStyle,
        title, engineVolumeFrom, engineVolumeTo } = req.body;

    readBotsService()
        .then((createdBots: *) => {
            if (typeof createdBots[title] === 'undefined') {
                writeBotsService(title, {
                    currentBrand,
                    currentState,
                    currentYearFrom,
                    currentYearTo,
                    currentModel,
                    currentBodyStyle,
                    engineVolumeFrom,
                    engineVolumeTo,
                }).then(() => res.send('OK')).catch(logger.error);
            } else {
                res.status(HTTPStatus.CONFLICT).send(`Already have ${title}`);
            }
        })
        .catch((err: Error) => res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err));
};

export const getAllBots = (req: $Request, res: $Response) => {
    readBotsService()
        .then((bots: *) => res.send(bots))
        .catch((err: Error) => res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err));
};
