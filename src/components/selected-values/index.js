// @flow
import { Table } from 'semantic-ui-react';
import type { LayoutPropsType } from '../../layout';

const SelectedValues = (props: LayoutPropsType) =>
    <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Brand</Table.HeaderCell>
                <Table.HeaderCell>Model</Table.HeaderCell>
                <Table.HeaderCell>Body style</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
                <Table.HeaderCell>Year From</Table.HeaderCell>
                <Table.HeaderCell>Year To</Table.HeaderCell>
                <Table.HeaderCell>Engine volume from</Table.HeaderCell>
                <Table.HeaderCell>Engine volume to</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            <Table.Row>
                <Table.Cell>{props.currentBrand}</Table.Cell>
                <Table.Cell>{props.currentModel}</Table.Cell>
                <Table.Cell>{props.currentBodyStyle}</Table.Cell>
                <Table.Cell>{props.currentState}</Table.Cell>
                <Table.Cell>{props.currentYearFrom}</Table.Cell>
                <Table.Cell>{props.currentYearTo}</Table.Cell>
                <Table.Cell>{props.engineVolumeFrom}</Table.Cell>
                <Table.Cell>{props.engineVolumeTo}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>;

export default SelectedValues;
