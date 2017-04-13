import winston from 'winston';

require('winston-papertrail').Papertrail; // eslint-disable-line

const winstonPapertrail = new winston.transports.Papertrail({
    host: 'logs5.papertrailapp.com',
    port: 13406,
});

winstonPapertrail.on('error', (err) => {
    // Handle, report, or silently ignore connection errors and failures
    console.log(err);
});

const logger = new winston.Logger({
    transports: [winstonPapertrail],
});

export default logger;
