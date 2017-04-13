// @flow
import https from 'https';
import fetch from 'isomorphic-fetch';
import httpStatus from 'http-status';
import type { $Response, $Request } from 'express';
import logger from '../logger';

const agent = new https.Agent({
    rejectUnauthorized: false,
});

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    timeout: 10000,
    mode: 'cors',
    agent,
};

const cacheMap = {};

type PropsType = {
    link: string | (a: *) => string,
    isCacheable: boolean
};

const proxy = ({ link, isCacheable }: PropsType) => (req: $Request, res: $Response) => {
    const fetchLink = typeof link === 'function' ? link(req) : link;

    try {
        if (typeof cacheMap[fetchLink] === 'undefined') {
            fetch(fetchLink, options)
                .then((response: Response): Promise<*> => response.json())
                .then((json: *) => {
                    if (isCacheable) cacheMap[fetchLink] = json;

                    res.send(json);
                });
        } else {
            res.send(cacheMap[fetchLink]);
        }
    } catch (err) {
        logger.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(err));
    }
};

export default proxy;

