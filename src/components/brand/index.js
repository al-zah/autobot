// @flow
import { Dropdown } from 'semantic-ui-react';
import type { BrandType } from 'autobot';
import { FilterContainer, FilterTitle } from '../../layout';
import type { LayoutPropsType } from '../../layout';

const transformBrandToOption = (entity: BrandType) => ({
    key: entity.value,
    value: entity.value,
    text: `${entity.name} (${entity.count})`,
});

const Brands = (props: LayoutPropsType) =>
    <FilterContainer>
        <FilterTitle>Brand:</FilterTitle>
        <div>
            <Dropdown
                options={(props.brands || []).map(transformBrandToOption)}
                placeholder="Select Model"
                fluid
                search
                selection
                onChange={(e: SyntheticMouseEvent, data: *) => props.updateCurrentBrand(data.value)}
            />
        </div>
    </FilterContainer>;

export default Brands;
