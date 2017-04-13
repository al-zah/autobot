// @flow
import { Dropdown } from 'semantic-ui-react';
import { range } from 'ramda';
import { FilterContainer, FilterTitle } from '../../layout';
import type { LayoutPropsType } from '../../layout';

const LOWEST_YEAR = 1990;
const HIGHEST_YEAR = 2018;

const years = range(LOWEST_YEAR, HIGHEST_YEAR).map((y: number) => ({
    key: y,
    value: y,
    text: y,
}));

const Years = (props: LayoutPropsType) =>
    <FilterContainer>
        <FilterTitle>Years:</FilterTitle>
        <div>
            From:
            <Dropdown
                options={years}
                placeholder="Select Year From"
                fluid
                search
                selection
                onChange={(e: SyntheticMouseEvent, data: *) => props.updateCurrentYearFrom(data.value)}
            />
        </div>
        <div>
            To:
            <Dropdown
                options={years}
                placeholder="Select Year To"
                fluid
                search
                selection
                onChange={(e: SyntheticMouseEvent, data: *) => props.updateCurrentYearTo(data.value)}
            />
        </div>
    </FilterContainer>;

export default Years;
