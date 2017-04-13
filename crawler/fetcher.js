// @flow
import { stringify } from 'query-string';
import type { QueryResultType } from 'autobot';
import { fetchWrapper } from './utils';

const URI_SEARCH_BASE = 'https://s-ua.auto.ria.com/blocks_search_ajax/search/';
const URI_SEARCH_BY_ID_BASE = 'https://auto.ria.com/demo/bu/searchPage/v2/view/auto/';

const VERY_BIG_NUMBER = 999;

const POWER_NAME = 1; // hz
const CATEGORY = 1; // i guess its cars
// const MARKA_ID_HONDA = 28; // i guess marka_id is car vendor/manufacturer
// const MODEL_ID_ACCORD = 262;

export const idsSelector = (json: QueryResultType): Array<string> => json.result.search_result.ids;

const buildSearchQuery = (props): string => {
    const queryMap = {
        countpage: VERY_BIG_NUMBER,
        power_name: POWER_NAME,
        category_id: CATEGORY,
        'marka_id[0]': props.currentBrand,
        'model_id[0]': props.currentModel,
        's_yers[0]': props.currentYearFrom,
        'po_yers[0]': props.currentYearTo,
        currency: 1,
        custom: 1,
        'bodystyle[5]': props.currentBodyStyle,
    };

    return `${URI_SEARCH_BASE}?${stringify(queryMap)}`;
};

export const fetchByQuery = (props) => fetchWrapper(buildSearchQuery(props));

export const fetchById = (id: string) => fetchWrapper(`${URI_SEARCH_BY_ID_BASE}${id}`);