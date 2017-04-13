// @flow
import { Dropdown } from 'semantic-ui-react';
import { compose } from 'ramda';
import { branch, renderNothing } from 'recompose';
import { MODELS } from '../../api/entities';
import { FilterContainer, FilterTitle, transformEntityToOption } from '../../layout';
import fetcher from '../../hoc/fetcher';
import type { LayoutPropsType } from '../../layout';

const modelEnhancer = compose(
    fetcher([MODELS]),
);

const ModelFilter = modelEnhancer((props: LayoutPropsType) =>
    <FilterContainer>
        <FilterTitle>Model:</FilterTitle>
        <div>
            <Dropdown
                options={(props.models || []).map(transformEntityToOption)}
                placeholder="Select Brand"
                fluid
                search
                selection
                onChange={(e: SyntheticMouseEvent, data: *) => props.updateCurrentModel(data.value)}
            />
        </div>
    </FilterContainer>);

const hideIfNoData = (hasNoData: boolean) =>
    branch(
        hasNoData,
        renderNothing,
    );

const MaybeModelFilter = hideIfNoData((props: LayoutPropsType): boolean => props.currentBrand === null)(ModelFilter);

export default MaybeModelFilter;
