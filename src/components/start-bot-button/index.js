import { Button } from 'semantic-ui-react';
import { compose, isNil, prop } from 'ramda';
import { withHandlers, branch, renderNothing } from 'recompose';
import type { LayoutPropsType } from '../../layout';

const hideIfNoData = (hasNoData: boolean) =>
    branch(
        hasNoData,
        renderNothing,
    );

const requiredProps = [
    'currentBrand',
    'currentModel',
];

const allProps = [
    ...requiredProps,
    'currentBrand',
    'currentState',
    'currentYearFrom',
    'currentYearTo',
    'currentModel',
    'currentBodyStyle',
    'engineVolumeFrom',
    'engineVolumeTo',
    'priceTo',
    'gasolineType',
    'transmission',
];

const findTitleByProp = props => (propName, value) => {
    const entity = prop(propName, props).find(ent => ent.value === value);

    return entity && entity.name;
};

const enhancer = compose(
    hideIfNoData((props: LayoutPropsType): boolean => requiredProps.some(propName => isNil(prop(propName, props)))),
    withHandlers({
        onBotStartButtonClick: (props: LayoutPropsType) => {
            const newBotProps = allProps.reduce((acc, val) => ({
                ...acc,
                [val]: prop(val, props),
            }), {});

            const findTitle = findTitleByProp(props);

            const brandTitle = findTitle('brands', prop('currentBrand', props));
            const modelTitle = findTitle('models', prop('currentModel', props));

            const title = `${brandTitle} ${modelTitle}`;

            fetch('/api/bots', {
                method: 'POST',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newBotProps,
                    title,
                }),
            });
        },
    }),
);

const StartBotButton = (props: LayoutPropsType) =>
    <Button primary onClick={props.onBotStartButtonClick}>Start Bot!</Button>;

export default enhancer(StartBotButton);
