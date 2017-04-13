// flow
import stream from 'stream';
import request from 'request';
import { difference, take } from 'ramda';
import type { CarType, QueryResultType } from 'autobot';
import { fetchByQuery, idsSelector, fetchById } from './fetcher';
import logger from './logger';
import { createdBots, botsMapToArray } from './api/bots';

const lastQueryResultState = {};
const BULLHORN_ID = 'cqRuOm5OAVn';
const URI_BASE = 'https://auto.ria.com/';

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

const fetcher = (props) => fetchByQuery(props)
    .then((json: QueryResultType) => { // eslint-disable-line
        logger.info(`${Date.now()}: crawling completed successfully!`);
        if (typeof lastQueryResultState[props.title] === 'undefined') {
            lastQueryResultState[props.title] = json;

            return false;
        }

        const maybeNewValues = difference(idsSelector(json), idsSelector(lastQueryResultState[props.title]));

        if (maybeNewValues.length > 0) {
            Promise.all(maybeNewValues.map(fetchById))
                .then((cars: Array<CarType>) => {
                    take(5, cars).forEach(car => horn(BULLHORN_ID, car));
                })
                .catch(logger.error);
        }

        lastQueryResultState[props.title] = json;
    })
    .catch(logger.error);

export const askAllBots = () => botsMapToArray(createdBots).forEach(bot => fetcher(bot));
