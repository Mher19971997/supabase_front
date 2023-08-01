import React from 'react';
import { IconButton } from '@mui/material';
import Icon from '@mui/material/Icon';
import SoftBox from 'components/SoftBox';
import SoftModal from 'components/SoftModal';
import SoftButton from 'components/SoftButton';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FormInput from '../FormInput';
import { getRowById } from 'http/restApi';
import { updateRowById } from 'http/restApi';
import * as moment from 'moment';
import ComplitePrimaryKey from '../ComplitePrimaryKey';
import { pick, omit } from 'lodash';
const EditRow = ({ columnNames, tableName, id }) => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState([]);
  const queryClient = useQueryClient();
  const { isLoading, data: columnData } = useQuery(
    [`${tableName}1`, open],
    () => getRowById({ tableName, id })
  );
  const changeValues = (key, value) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate } = useMutation(
    ({ tableName, id, inputDto }) => updateRowById({ tableName, id, inputDto }),
    {
      onSuccess: (response, formData) => {
        queryClient.invalidateQueries(`${tableName}`);
        setOpen(false);
      },
      onError: (error) => {
        console.log(error);
      }
    }
  );

  const renderInputValue = (column) => {
    let value = values[column];
    if (
      !isLoading &&
      (column === 'createdAt' ||
        column === 'updatedAt' ||
        column === 'startDate' ||
        column === 'endDate')
    ) {
      value = moment(!isLoading && columnData[column]).format(
        'YYYY-MM-DDTHH:mm'
      );
    } else {
      value = !isLoading && columnData[column];
    }
    return value;
  };

  const renderInputType = (column) => {
    let type = 'number';
    if (
      !isLoading &&
      (column === 'createdAt' ||
        column === 'updatedAt' ||
        column === 'startDate' ||
        column === 'endDate')
    ) {
      return (type = 'datetime-local');
    }
    if (columnData && typeof columnData[column] === 'string') {
      return (type = 'text');
    }
    return type;
  };
  // // Object.keys
  // console.log(!isLoading &&  pick(Object.keys(columnData), [...columnNames]),"columnNamescolumnNamescolumnNamescolumnNames");
  // console.log(!isLoading && Object.keys(columnData),"keyskeyskeyskeyskeyskeyskeyskeys");
  // console.log(!isLoading  && columnNames,"sssssssssssssssssss");
  return (
    <SoftBox>
      <IconButton size='small' onClick={handleOpen}>
        <Icon fontSize='small' color='warning'>
          edit_icon
        </Icon>
      </IconButton>
      <SoftModal title='Edit' open={open} handleClose={handleClose} width='50%'>
        <SoftBox display='flex' flexWrap='wrap' gap={2}>
          {id &&
            tableName &&
            columnNames?.map((column, index) => {
              console.log(column.includes('Id'), 'IdIdIdIdIdIdIdIdIdIdId');
              console.log(column, 'IdIdIdIdIdIdIdIdIdIdId');
              return column.includes('Id') ? (
                <>
                  {console.log(
                    column.split('Id').join('s'),
                    '|columncolumncolumncolumncolumn'
                  )}
                  {/* categories */}
                  <ComplitePrimaryKey
                    value={renderInputValue(column)}
                    onChangeCompliteValue={(event, newValue) => {
                      changeValues(column, newValue);
                    }}
                    compliteName={
                      (column === 'subCategoryId' && 'subCategories') ||
                      (column === 'categoryId' && 'categories') ||
                      column.split('Id').join('s')
                    }
                  />
                </>
              ) : (
                <FormInput
                  key={index}
                  name={column}
                  type={renderInputType(column)}
                  placeholder={column}
                  onChange={(e) => changeValues(column, e.target.value)}
                  value={renderInputValue(column)}
                />
              );
            })}
        </SoftBox>
        <SoftBox display='flex' justifyContent='flex-end'>
          <SoftButton
            variant='outlined'
            color='warning'
            onClick={() =>
              id &&
              tableName &&
              mutate({ tableName: tableName, id: id, inputDto: { ...values } })
            }
          >
            Update
          </SoftButton>
        </SoftBox>
      </SoftModal>
    </SoftBox>
  );
};

export default EditRow;
