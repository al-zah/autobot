// @flow
import { Dropdown } from 'semantic-ui-react';
import { FilterContainer, FilterTitle, transformEntityToOption } from '../../layout';
import type { LayoutPropsType } from '../../layout';

const BodyStyles = (props: LayoutPropsType) =>
    <FilterContainer>
        <FilterTitle>Body Styles:</FilterTitle>
        <div>
            <Dropdown
                options={(props.bodyStyles || []).map(transformEntityToOption)}
                placeholder="Select Model"
                fluid
                search
                selection
                onChange={(e: SyntheticMouseEvent, data: *) => props.updateCurrentBodyStyle(data.value)}
            />
        </div>
    </FilterContainer>;

export default BodyStyles;
