import request from 'request';
import stream from 'stream';
import { difference } from 'ramda';
import { fetchByQuery, idsSelector, fetchById } from './fetcher';

const URI_BASE = 'https://auto.ria.com/';

const requestToIntegram = (id, res) => {
    const url = `https://integram.org/${id}`;

    return request.post({ url }, (error, response, body) => {
        if (error) return res(error);

        res(null, body);
    });
};

export const horn = (id, json) => {
    const title = json.title;
    const location = json.locationCityName;
    // const photo = json.photoData.seoLinkF;
    const price = json.USD;
    const link = `${URI_BASE}${json.linkToView}`;

    const message = JSON.stringify({
        text: `
*${title}*
${location}
Price: ${price}
[Link to the website](${link})
`
    });

    const a = new stream.PassThrough();

    a.write(message);
    a.pipe(requestToIntegram(id, (err, body) => {
        if (err) console.log(err);

        console.log('successfully ');
        console.log(body);
    }));
    a.end();
};

let lastQueryResultState = null;
const DELAY = 60000;
const BULLHORN_ID = 'cqRuOm5OAVn';

setInterval(() => {
    fetchByQuery()
        .then(json => {
            console.log('crawling completed successfully!');
            if (lastQueryResultState === null) {
                lastQueryResultState = json;
                return false;
            }

            const maybeNewValues = difference(idsSelector(json), idsSelector(lastQueryResultState));

            console.log('new values: ');
            console.log(maybeNewValues);
            if (maybeNewValues.length > 0) {
                Promise.all(maybeNewValues.map(fetchById))
                    .then((cars) => {
                        cars.forEach(car => horn(BULLHORN_ID, car));
                    })
                    .catch(e => console.log(e));
            }

            lastQueryResultState = json;
        })
        .catch(e => console.log(e));
}, DELAY);
