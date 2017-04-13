// @flow
import { Dropdown } from 'semantic-ui-react';
import { FilterContainer, FilterTitle, transformEntityToOption } from '../../layout';
import type { LayoutPropsType } from '../../layout';

const State = (props: LayoutPropsType) =>
    <FilterContainer>
        <FilterTitle>State:</FilterTitle>
        <div>
            <Dropdown
                options={(props.states || []).map(transformEntityToOption)}
                placeholder="Select State"
                fluid
                search
                selection
                onChange={(e: SyntheticMouseEvent, data: *) => props.updateCurrentState(data.value)}
            />
        </div>
    </FilterContainer>;

export default State;
