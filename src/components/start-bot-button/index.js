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
    'currentState',
    'currentYearFrom',
    'currentYearTo',
    'currentModel',
    'currentBodyStyle',
];

const findTitleByProp = props => (propName, value) => {
    const entity = prop(propName, props).find(ent => ent.value === value);

    return entity.name;
};

const enhancer = compose(
    hideIfNoData((props: LayoutPropsType): boolean => requiredProps.some(propName => isNil(prop(propName, props)))),
    withHandlers({
        onBotStartButtonClick: (props: LayoutPropsType) => {
            const reqProps = requiredProps.reduce((acc, val) => ({
                ...acc,
                [val]: prop(val, props),
            }), {});

            const findTitle = findTitleByProp(props);

            const brandTitle = findTitle('brands', prop('currentBrand', props));
            const modelTitle = findTitle('models', prop('currentModel', props));
            const bodyStyleTitle = findTitle('bodyStyles', prop('currentBodyStyle', props));
            const stateTitle = findTitle('states', prop('currentState', props));
            const yearFrom = prop('currentYearFrom', props);
            const yearTo = prop('currentYearTo', props);

            const title = `${brandTitle} ${modelTitle} ${bodyStyleTitle} in ${stateTitle}, ${yearFrom}-${yearTo}`;

            fetch('/api/bots', {
                method: 'POST',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...reqProps,
                    title,
                }),
            });
        },
    }),
);

const StartBotButton = (props: LayoutPropsType) =>
    <Button primary onClick={props.onBotStartButtonClick}>Start Bot!</Button>;

export default enhancer(StartBotButton);
