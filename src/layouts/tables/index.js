// @mui material components
import Card from '@mui/material/Card';
import * as qs from 'qs';

// React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import PropTypes from 'prop-types';

// Data
import { useQuery } from 'react-query';
import { getTableColumn } from 'http/restApi';
import Table from 'examples/Tables';
import DeleteRow from './components/DeleteRow';
import EditRow from './components/EditRow';
import TableSceletion from './components/TableSceletion';

function Tables({ tableName, index }) {
  const { isLoading, data: tables } = useQuery([`${tableName}`, index], () =>
    getTableColumn(
      tableName,
      qs.stringify({
        queryMeta: {
          columns: true
        }
      })
    )
  );

  const columns =
    (!isLoading &&
      tables?.columns?.map((table) => ({
        name: table,
        align: 'center'
      }))) ||
    [];

  const rows = tables?.data?.map((table) => ({
    ...table,
    actions: (
      <SoftBox
        display='flex'
        alignItems='center'
        gap={2}
        justifyContent='space-between'
      >
        <EditRow
          tableName={tableName}
          id={table.id}
          columnNames={tables?.columns}
        />
        <DeleteRow tableName={tableName} id={table.id} />
      </SoftBox>
    )
  }));

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              p={3}
            >
              <SoftTypography
                variant='h4'
                color='warning'
                fontWeight='bold'
                textGradient
              >
                {String(tableName).charAt(0).toUpperCase() +
                  String(tableName).slice(1)}{' '}
                Table
              </SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                '& .MuiTableRow-root:not(:last-child)': {
                  '& td': {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`
                  }
                }
              }}
            >
              {isLoading ? (
                <TableSceletion />
              ) : (
                <Table
                  columns={[
                    ...columns,
                    {
                      name: 'actions',
                      align: 'center'
                    }
                  ]}
                  rows={(!isLoading && rows) || []}
                />
              )}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

Tables.propTypes = {
  tableName: PropTypes.string
};

export default Tables;
