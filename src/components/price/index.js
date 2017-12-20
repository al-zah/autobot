// @flow
/* eslint-disable no-undef */
import { Input } from 'semantic-ui-react';
import { FilterContainer, FilterTitle } from '../../layout';
import type { LayoutPropsType } from '../../layout';

const Price = (props: LayoutPropsType) =>
    <FilterContainer>
        <FilterTitle>Price (to):</FilterTitle>
        <div>
            <Input
                type="number"
                placeholder="Price to"
                value={props.priceTo}
                onChange={({ target }: SyntheticKeyboardEvent) => target instanceof HTMLInputElement &&
                    props.updatePrice(target.value)}
            />
        </div>
    </FilterContainer>;

export default Price;
