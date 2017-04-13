// @flow
import type { $Request, $Response } from 'express';
import HTTPStatus from 'http-status';

export const createdBots = {};

export const botsMapToArray = (botsMap: *) => Object.keys(botsMap).map((key: string) => ({
    title: key,
    ...botsMap[key],
}));

export const createBot = (req: $Request, res: $Response) => {
    const { currentBrand, currentState, currentYearFrom, currentYearTo, currentModel, currentBodyStyle,
        title } = req.body;

    if (typeof createdBots[title] === 'undefined') {
        createdBots[title] = {
            currentBrand,
            currentState,
            currentYearFrom,
            currentYearTo,
            currentModel,
            currentBodyStyle,
        };

        res.send('OK');
    } else {
        res.status(HTTPStatus.CONFLICT).send(`Already have ${title}`);
    }
};

export const getAllBots = (req: $Request, res: $Response) => {
    res.send(botsMapToArray(createdBots));
};
