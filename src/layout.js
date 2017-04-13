// @flow
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { withState } from 'recompose';
import { Header, Container, Divider } from 'semantic-ui-react';
import type { BrandType, StateType, ModelType } from 'autobot';
import fetcher from './hoc/fetcher';
import {
    BRANDS,
    brandsSelector,
    STATES,
    statesSelector,
    modelsSelector,
    BODYSTYLES,
    bodyStylesSelector,
    BOTS,
    botsSelector
} from './api/entities';
import type { AppStateType } from './reducers/index';
import Brands from './components/brand';
import Models from './components/model';
import SelectedValues from './components/selected-values';
import State from './components/state';
import Years from './components/years';
import BodyStyles from './components/bodystyles';
import StartBotButton from './components/start-bot-button';
import CurrentBots from './components/current-bots';

export const FilterTitle = styled.h2`
    font-size: 16px;
    padding: 10px 0;
`;

export const FilterContainer = styled.div`
    padding: 10px 0;
`;

const mapStateToProps = (state: AppStateType) => ({
    brands: brandsSelector(state),
    states: statesSelector(state),
    models: modelsSelector(state),
    bodyStyles: bodyStylesSelector(state),
    bots: botsSelector(state),
});

const enhancer = compose(
    connect(mapStateToProps),
    fetcher([BRANDS, STATES, BODYSTYLES, BOTS]),
    withState('currentBrand', 'updateCurrentBrand', null),
    withState('currentState', 'updateCurrentState', null),
    withState('currentYearFrom', 'updateCurrentYearFrom', null),
    withState('currentYearTo', 'updateCurrentYearTo', null),
    withState('currentModel', 'updateCurrentModel', null),
    withState('currentBodyStyle', 'updateCurrentBodyStyle', null),
);

type GenericEntityType = {
    value: string | number,
    name: string
};

export const transformEntityToOption = (entity: GenericEntityType) => ({
    key: entity.value,
    value: entity.value,
    text: entity.name,
});

export type LayoutPropsType = {
    brands: Array<BrandType>,
    states: Array<StateType>,
    models: Array<ModelType>,

    currentBrand: ?string,
    currentState: ?string,
    currentYearFrom: ?string,
    currentYearTo: ?string,
    currentModel: ?string,
    currentBodyStyle: ?string,
    updateCurrentBrand: () => void,
    updateCurrentState: () => void,
    updateCurrentYearFrom: () => void,
    updateCurrentYearTo: () => void,
    updateCurrentModel: () => void,
    updateCurrentBodyStyle: () => void
};

const Layout = (props: LayoutPropsType) =>
    <Container>
        <Header as="h2">Welcome</Header>
        <Brands {...props} />
        <Models {...props} />
        <BodyStyles {...props} />
        <State {...props} />
        <Years {...props} />

        <Divider horizontal>Currently selected:</Divider>
        <SelectedValues {...props} />
        <StartBotButton {...props} />
        <Divider horizontal>Already started bots in system:</Divider>
        <CurrentBots {...props} />
    </Container>;

export default enhancer(Layout);
