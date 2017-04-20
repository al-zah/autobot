import bodyParser from 'body-parser';
import { askAllBots } from '../crawler/horn';
import api from '../crawler/api';

require('newrelic');

const sharedMw = (app) => {
    const DELAY = 30000;

    setInterval(askAllBots, DELAY);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', api);
};

export default sharedMw;
