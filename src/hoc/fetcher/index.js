// @flow
import { fetchHOCCreator } from 'redux-ntities';
import { mapEntitiesToRestUrl, entityIdSelector } from '../../api/entities';

export default fetchHOCCreator({
    useCache: true,
    mapEntitiesToRestUrl,
    entityIdSelector,
});
