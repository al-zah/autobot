import { flatten } from 'ramda';
import type { AppStateType } from '../reducers';

export const BRANDS = 'BRANDS';
export const STATES = 'STATES';
export const MODELS = 'MODELS';
export const BODYSTYLES = 'BODYSTYLES';
export const BOTS = 'BOTS';
const noop = () => {}; // eslint-disable-line

const entityArraySelectorCreator = (entity: string) => (state: AppStateType) => {
    const maybeBrands = state.entities[entity];

    if (Array.isArray(maybeBrands)) {
        return flatten(maybeBrands);
    }

    return state.entities[entity];
};

export const brandsSelector = entityArraySelectorCreator(BRANDS);
export const statesSelector = entityArraySelectorCreator(STATES);
export const modelsSelector = entityArraySelectorCreator(MODELS);
export const bodyStylesSelector = entityArraySelectorCreator(BODYSTYLES);
export const botsSelector = entityArraySelectorCreator(BOTS);

export const entityIdSelector = {
    [BRANDS]: noop,
    [STATES]: noop,
    [MODELS]: noop,
    [BODYSTYLES]: noop,
    [BOTS]: noop,
};

export const mapEntitiesToRestUrl = {
    [BRANDS]: (): string => '/api/brands', // eslint-disable-line
    [STATES]: (): string => '/api/states', // eslint-disable-line
    [MODELS]: (props): string => `/api/models/${props.currentBrand}`,
    [BODYSTYLES]: (): string => '/api/bodystyles', // eslint-disable-line
    [BOTS]: (): string => '/api/bots', // eslint-disable-line
};
