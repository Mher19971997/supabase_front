import React from 'react';
import { IconButton } from '@mui/material';
import Icon from '@mui/material/Icon';
import SoftBox from 'components/SoftBox';
import SoftModal from 'components/SoftModal';
import SoftButton from 'components/SoftButton';
import { useMutation, useQueryClient } from 'react-query';
import { deleteRowById } from 'http/restApi';

const DeleteRow = ({ tableName, id = '' }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ({ tableName, id }) => deleteRowById({ tableName, id }),
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

  return (
    <SoftBox>
      <IconButton size='small' onClick={handleOpen}>
        <Icon fontSize='small' color='error'>
          delete_icon
        </Icon>
      </IconButton>
      <SoftModal
        title='Delete User'
        open={open}
        handleClose={handleClose}
        width='20%'
      >
        <SoftBox display='flex' alignItems='center' gap={2}>
          <SoftButton variant='outlined' color='error' onClick={handleClose}>
            cancel
          </SoftButton>
          <SoftButton
            variant='outlined'
            color='success'
            onClick={() => tableName && id && mutate({ tableName, id })}
          >
            ok
          </SoftButton>
        </SoftBox>
      </SoftModal>
    </SoftBox>
  );
};

export default DeleteRow;
