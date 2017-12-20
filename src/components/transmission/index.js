// @flow
/* eslint-disable no-undef */
import { Dropdown } from 'semantic-ui-react';
import { FilterContainer, FilterTitle } from '../../layout';
import type { LayoutPropsType } from '../../layout';

const trannyType = [
    {
        key: 1,
        value: 1,
        text: 'Manual',
    },
    {
        key: 2,
        value: 2,
        text: 'Auto',
    },
];

const Transmission = (props: LayoutPropsType) =>
    <FilterContainer>
        <FilterTitle>Transmission Type:</FilterTitle>
        <div>
            <Dropdown
                options={trannyType}
                placeholder="Select Transmission type"
                fluid
                search
                selection
                onChange={(e: SyntheticMouseEvent, data: *) => props.updateTranny(data.value)}
            />
        </div>
    </FilterContainer>;

export default Transmission;
