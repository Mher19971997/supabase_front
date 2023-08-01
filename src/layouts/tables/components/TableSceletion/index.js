import React from 'react';
import Table from 'examples/Tables';
import { Skeleton } from '@mui/material';
import { generateData } from 'utils/tableColumnData';

const TableSceletion = ({}) => {
  return (
    <div>
      <Table
        columns={[
          { name: 'loading', accessor: 'userId', align: 'center' },
          { name: 'loading', accessor: 'email', align: 'center' },
          { name: 'loading', accessor: 'uuid', align: 'center' },
          { name: 'loading', accessor: 'createdAt', align: 'center' },
          { name: 'loading', accessor: 'roles', align: 'center' },
          { name: 'loading', accessor: 'actions', align: 'center' }
        ]}
        rows={generateData(10, {
          loading: (
            <Skeleton variant='text' sx={{ fontSize: '14px' }} width={80} />
          )
        })}
      />
    </div>
  );
};

export default TableSceletion;
