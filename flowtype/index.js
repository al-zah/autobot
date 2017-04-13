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

declare module 'autobot' {
    declare type CarType = car$Type;
    declare type QueryResultType = queryResult$Type;
}
