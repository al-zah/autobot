// @flow
declare type car$Type = {
    title: string,
    locationCityName: string,
    USD: string,
    linkToView: string
};

declare type queryResult$Type = {
    result: {
        search_result: {
            ids: Array<string>
        }
    }
};

declare type genericEntity$Type = {
    name: string,
    value: number
}

declare type brand$Type = genericEntity$Type & { count: number };

declare module 'autobot' {
    declare type CarType = car$Type;
    declare type QueryResultType = queryResult$Type;
    declare type BrandType = $Shape<brand$Type>;
    declare type StateType = $Shape<genericEntity$Type>;
    declare type ModelType = $Shape<genericEntity$Type>;
}
