// kudos to devs from auto.ria for retarded query params naming
import { stringify } from 'query-string';
import { fetchWrapper } from './utils';

const URI_SEARCH_BASE = 'https://s-ua.auto.ria.com/blocks_search_ajax/search/';
const URI_SEARCH_BY_ID_BASE = 'https://auto.ria.com/demo/bu/searchPage/v2/view/auto/';

const VERY_BIG_NUMBER = 999;

const POWER_NAME = 1; // hz
const CATEGORY = 1; // i guess its cars
const MARKA_ID_HONDA = 28; // i guess marka_id is car vendor/manufacturer
const MODEL_ID_ACCORD = 262;

export const idsSelector = json => json.result.search_result.ids;

const buildSearchQuery = () => {
    const queryMap = {
        countpage: VERY_BIG_NUMBER,
        power_name: POWER_NAME,
        category_id: CATEGORY,
        'marka_id[0]': MARKA_ID_HONDA,
        'model_id[0]': MODEL_ID_ACCORD,
        's_yers[0]': 2007,
        'po_yers[0]': 0,
        currency: 1,
        custom: 1,
        'bodystyle[5]': 6,
    };

    return `${URI_SEARCH_BASE}?${stringify(queryMap)}`;
};

export const fetchByQuery = () => fetchWrapper(buildSearchQuery());

export const fetchById = (id) => fetchWrapper(`${URI_SEARCH_BY_ID_BASE}${id}`);
