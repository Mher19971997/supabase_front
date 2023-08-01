import { useMemo } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// uuid is a library for generating unique id
import { v4 as uuidv4 } from 'uuid';

// @mui material components
import { Icon, IconButton, Table as MuiTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

// React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// React base styles
import colors from 'assets/theme/base/colors';
import typography from 'assets/theme/base/typography';
import borders from 'assets/theme/base/borders';
import { Skeleton } from '@mui/material';

const Table = ({ columns, rows, minHeight }) => {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns?.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      (name === 'loading' && (
        <SoftBox
          key={name}
          component='th'
          width={width || 'auto'}
          pt={1.5}
          pb={1.25}
          pl={3}
          pr={3}
          textAlign={'center'}
          fontSize={size.xxs}
          fontWeight={fontWeightBold}
          color='inherit'
          opacity={0.7}
          borderBottom={`${borderWidth[1]} solid ${light.main}`}
        >
          <SoftBox sx={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton
              variant='text'
              sx={{
                fontSize: '14px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
              width={80}
            />
          </SoftBox>
        </SoftBox>
      )) ||
      (name === 'actions' && (
        <SoftBox
          key={name}
          component='th'
          width={width || 'auto'}
          pt={1.5}
          pb={1.25}
          pl={align === 'left' ? pl : 3}
          pr={align === 'right' ? pr : 3}
          textAlign={align}
          fontSize={size.xxs}
          fontWeight={fontWeightBold}
          color='inherit'
          opacity={0.7}
          borderBottom={`${borderWidth[1]} solid ${light.main}`}
        >
          <IconButton size='large' color='text'>
            <Icon sx={{ fontWeight: 'bold' }}>filter_list_icon</Icon>
          </IconButton>
        </SoftBox>
      )) || (
        <SoftBox
          key={name}
          component='th'
          width={width || 'auto'}
          pt={1.5}
          pb={1.25}
          pl={align === 'left' ? pl : 3}
          pr={align === 'right' ? pr : 3}
          textAlign={align}
          fontSize={size.xxs}
          fontWeight={fontWeightBold}
          color='inherit'
          opacity={0.7}
          borderBottom={`${borderWidth[1]} solid ${light.main}`}
        >
          {name.toUpperCase()}
        </SoftBox>
      )
    );
  });

  const renderRows = rows?.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns?.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <SoftBox
            key={uuidv4()}
            component='td'
            p={1}
            borderBottom={
              row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null
            }
          >
            <SoftBox display='flex' alignItems='center' py={0.5} px={1}>
              <SoftTypography
                variant='button'
                fontWeight='medium'
                sx={{ width: 'max-content' }}
              >
                {row[name][1]}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        );
      } else {
        template = (
          <SoftBox
            key={uuidv4()}
            component='td'
            p={1}
            textAlign={align}
            borderBottom={
              row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null
            }
          >
            <SoftTypography
              variant='button'
              fontWeight='regular'
              color='inherit'
              sx={{ display: 'inline-block', width: 'max-content' }}
            >
              {row[name]}
            </SoftTypography>
          </SoftBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });
  return useMemo(
    () => (
      <TableContainer
        sx={{ paddingBottom: 3, height: minHeight, position: 'relative' }}
      >
        <MuiTable>
          <SoftBox component='thead'>
            <TableRow>{renderColumns}</TableRow>
          </SoftBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows]
  );
};

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}]
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
  minHeight: PropTypes.number
};

export default Table;
