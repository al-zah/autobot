// @flow
/* eslint-disable no-undef */
import { Input } from 'semantic-ui-react';
import { FilterContainer, FilterTitle } from '../../layout';
import type { LayoutPropsType } from '../../layout';

const EngineVolume = (props: LayoutPropsType) =>
    <FilterContainer>
        <FilterTitle>Engine Volume:</FilterTitle>
        <div>
            <Input
                type="number"
                placeholder="Engine volume from"
                value={props.engineVolumeFrom}
                onChange={({ target }: SyntheticKeyboardEvent) => target instanceof HTMLInputElement &&
                    props.updateEngineVolumeFrom(target.value)}
            />

            <Input
                type="number"
                placeholder="Engine volume to"
                value={props.engineVolumeTo}
                onChange={({ target }: SyntheticKeyboardEvent) => target instanceof HTMLInputElement &&
                    props.updateEngineVolumeTo(target.value)}
            />
        </div>
    </FilterContainer>;

export default EngineVolume;
