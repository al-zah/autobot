// @flow
import { stringify } from 'query-string';
import type { QueryResultType } from 'autobot';
import { fetchWrapper } from './utils';

const URI_SEARCH_BASE = 'https://s-ua.auto.ria.com/blocks_search_ajax/search/';
const URI_SEARCH_BY_ID_BASE = 'https://auto.ria.com/demo/bu/searchPage/v2/view/auto/';

const VERY_BIG_NUMBER = 999;

const POWER_NAME = 1; // hz
const CATEGORY = 1; // i guess its cars

const filterDefinedProps = (props: *) => Object.keys(props).reduce((acc: *, key: *) => {
    if (typeof props[key] !== 'undefined' && props[key] !== null) {
        return {
            ...acc,
            [key]: props[key],
        };
    }

    return acc;
}, {});

export const idsSelector = (json: QueryResultType): Array<string> => json.result.search_result.ids;

const buildSearchQuery = (props: *): string => {
    const queryMap = {
        countpage: VERY_BIG_NUMBER,
        power_name: POWER_NAME,
        category_id: CATEGORY,
        'marka_id[0]': props.currentBrand,
        'model_id[0]': props.currentModel,
        's_yers[0]': props.currentYearFrom,
        'po_yers[0]': props.currentYearTo,
        engineVolumeFrom: props.engineVolumeFrom,
        engineVolumeTo: props.engineVolumeTo,
        currency: 1,
        custom: 1,
        'bodystyle[5]': props.currentBodyStyle,
        'type[0]': props.gasolineType,
        price_do: props.priceTo,
        'gearbox[0]': props.transmission,
        state: props.currentState,
    };

    return `${URI_SEARCH_BASE}?${stringify(filterDefinedProps(queryMap))}`;
};

export const fetchByQuery = (props: *) => fetchWrapper(buildSearchQuery(props));

export const fetchById = (id: string) => fetchWrapper(`${URI_SEARCH_BY_ID_BASE}${id}`);
