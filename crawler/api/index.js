// @flow
import express from 'express';
import createProxy from './create-proxy';
import { createBot, getAllBots } from './bots';

const api = express();

api.get('/health', (req: express$Request, res: express$Response) => res.end('OK'));
api.get('/brands',
    createProxy({ link: 'https://auto.ria.com/api/categories/1/marks/_active/_with_count', isCacheable: true }),
);
api.get('/states',
    createProxy({ link: 'https://api.auto.ria.com/states', isCacheable: true }),
);
api.get('/models/:brandId',
    createProxy({
        link: (req: express$Request) => `https://api.auto.ria.com/categories/1/marks/${req.params.brandId}/models`,
        isCacheable: true,
    }),
);
api.get('/bodystyles', createProxy({ link: 'https://api.auto.ria.com/categories/1/bodystyles', isCacheable: true }));

api.post('/bots', createBot);
api.get('/bots', getAllBots);

export default api;
