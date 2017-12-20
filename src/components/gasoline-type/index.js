// @flow
/* eslint-disable no-undef */
import { Dropdown } from 'semantic-ui-react';
import { FilterContainer, FilterTitle } from '../../layout';
import type { LayoutPropsType } from '../../layout';

const gasolineTypes = [
    {
        key: 1,
        value: 1,
        text: 'Benzik',
    },
    {
        key: 2,
        value: 2,
        text: 'Disel',
    },
    {
        key: 3,
        value: 3,
        text: 'Gaz',
    },
];

const Gasoline = (props: LayoutPropsType) =>
    <FilterContainer>
        <FilterTitle>Gasoline Type:</FilterTitle>
        <div>
            <Dropdown
                options={gasolineTypes}
                placeholder="Select Gas type"
                fluid
                search
                selection
                onChange={(e: SyntheticMouseEvent, data: *) => props.updateGasolineType(data.value)}
            />
        </div>  
    </FilterContainer>;

export default Gasoline;
