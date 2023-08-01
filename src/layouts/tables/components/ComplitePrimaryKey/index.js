import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import { useQuery } from 'react-query';
import { getTableColumn } from 'http/restApi';
import * as qs from 'qs';

const ComplitePrimaryKey = ({ value, onChangeCompliteValue, compliteName }) => {
  const { isLoading, data: tables } = useQuery(
    [`${compliteName}`, compliteName],
    () => getTableColumn(compliteName, qs.stringify({}))
  );
  return (
    <SoftBox>
      <SoftBox mb={0.5} ml={0.5}>
        <SoftTypography component='label' variant='caption' fontWeight='bold'>
          {String(compliteName).charAt(0).toUpperCase() +
            String(compliteName).slice(1)}
        </SoftTypography>
      </SoftBox>
      <Autocomplete
        value={value}
        onChange={onChangeCompliteValue}
        defaultValue={value}
        aria-required
        disablePortal
        id='combo-box-demo'
        options={!isLoading && tables?.data?.map((item) => item.id)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            icon={{
              component: !isLoading && <CircularProgress size={'16px'} />,
              direction: 'right'
            }}
          />
        )}
      />
    </SoftBox>
  );
};

ComplitePrimaryKey.propTypes = {
  onChangeCompliteValue: PropTypes.func,
  value: PropTypes.any,
  isLoading: PropTypes.bool,
  compliteName: PropTypes.string
};

export default ComplitePrimaryKey;
