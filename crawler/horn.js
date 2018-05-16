// flow
import stream from 'stream';
import request from 'request';
import { difference, head, filter, compose, propEq } from 'ramda';
import type { CarType, QueryResultType } from 'autobot';
import { fetchByQuery, idsSelector, fetchById } from './fetcher';
import logger from './logger';
import { readBotsService, readResultsService, writeResultsService } from './services';

const BULLHORN_ID = 'cqRuOm5OAVn';
const URI_BASE = 'https://auto.ria.com/';
const DELAY = 25000;

const requestToIntegram = (id: string, res: () => void) => {
    const url = `https://integram.org/${id}`;

    return request.post({ url }, (error, response, body): void => {
        if (error) return res(error);

        return res(null, body);
    });
};

const buildMessage = (json: CarType): string => `
*${json.title}*
${json.locationCityName}
Price: ${json.USD}
[Link to the website](${URI_BASE}${json.linkToView})
`;

export const horn = (id: string, json: CarType) => {
    const message = JSON.stringify({
        text: buildMessage(json),
    });

    const transformStream = new stream.PassThrough();

    transformStream.write(message);
    transformStream.pipe(requestToIntegram(id, (err: Error | null, body: *) => {
        if (err) logger.error(err);

        logger.info('successfully sent item to telegram');
        logger.info(JSON.stringify(body));
    }));
    transformStream.end();
};

const fetcher = (props: *) => fetchByQuery(props)
    .then((json: QueryResultType) => { // eslint-disable-line
        logger.info(`${new Date().toUTCString()}: crawling completed successfully!`);
        readResultsService()
            .then((lastQueryResults: *) => {
                const filterByTitle = compose(
                    head,
                    filter(propEq('title', props.title)),
                );
                const lastQueryResultsByTitle = filterByTitle(lastQueryResults);

                if (typeof lastQueryResultsByTitle === 'undefined') {
                    writeResultsService(props.title, json).catch(logger.error);

                    return false;
                }

                const maybeNewValues = difference(idsSelector(json), idsSelector(lastQueryResultsByTitle));

                if (maybeNewValues.length > 0) {
                    maybeNewValues.forEach(value => setTimeout(
                        () => fetchById(value).then(car => horn(BULLHORN_ID, car)).catch(logger.error), // eslint-disable-line
                        1000, // eslint-disable-line
                    ));
                }

                return writeResultsService(props.title, json).catch(logger.error);
            });
    })
    .catch(logger.error);

export const askAllBots = () =>
    readBotsService()
        .then((createdBots: *) => {
            createdBots.forEach(bot => setTimeout(() => fetcher(bot), DELAY / createdBots.length));
        })
        .catch(logger.error);
