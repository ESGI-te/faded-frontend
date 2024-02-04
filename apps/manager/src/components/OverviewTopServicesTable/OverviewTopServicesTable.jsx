import { Cell as AriaCell, Table as AriaTable, TableBody } from 'react-aria-components';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import TableColumn from 'shared/src/components/TableColumn';
import TableHeader from 'shared/src/components/TableHeader';
import TableRow from 'shared/src/components/TableRow';
import Text from 'shared/src/components/Text';
import TopServiceMedal from './TopServiceMedal';
import Cluster from 'shared/src/components/Cluster';

const OverviewTopServicesTable = ({ items }) => {
    const intl = useIntl();
    const columns = [
        {
            key: 'position',
            isRowHeader: true,
            name: intl.formatMessage({ defaultMessage: 'Position' }),
        },
        {
            key: 'name',
            name: intl.formatMessage({ defaultMessage: 'Prestation' }),
        },
        {
            key: 'number',
            name: intl.formatMessage({ defaultMessage: 'Popularité' }),
        },
        {
            key: 'turnover',
            name: intl.formatMessage({ defaultMessage: "Chiffre d'affaire" }),
        },
        {
            key: 'rate',
            name: intl.formatMessage({ defaultMessage: 'Ratio' }),
        },
    ];

    return (
        <Table aria-label="Top appointments">
            <TableHeader columns={columns}>
                {({ key, ...column }) => (
                    <TableColumn id={key} {...column}>
                        <Text color="--neutral500" fontWeight="--fw-semibold">
                            {column.name}
                        </Text>
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items} renderEmptyState={() => 'No results found.'}>
                {(appointment) => (
                    <TableRow id={appointment.id}>
                        <Cell>
                            <Cluster gap="0.5rem" align="center">
                                {appointment.position <= 3 && (
                                    <TopServiceMedal position={appointment.position} />
                                )}
                                {appointment.position}
                            </Cluster>
                        </Cell>
                        <Cell>{appointment.name}</Cell>
                        <Cell>{appointment.number}</Cell>
                        <Cell>{appointment.turnover}€</Cell>
                        <Cell>
                            {appointment.rate}
                            {/* <AppointmentStatusBadge status={appointment.status} /> */}
                        </Cell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

const Table = styled(AriaTable)`
    width: 100%;
    padding: 1rem;
    border-spacing: 0 0.5rem;
    border-collapse: collapse;
    overflow-x: auto;
`;
const Cell = styled(AriaCell)`
    padding: 0.75rem 1rem;
`;

export default OverviewTopServicesTable;
