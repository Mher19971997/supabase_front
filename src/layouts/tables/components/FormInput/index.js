import React from 'react';
import PropTypes from 'prop-types';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';

const FormInput = ({ name, type, placeholder, onChange, value }) => {
  return (
    <SoftBox mb={0.5}>
      <SoftBox mb={0.5} ml={0.5}>
        <SoftTypography
          component='label'
          variant='caption'
          fontWeight='bold'
          textGradient
        >
          {placeholder}
        </SoftTypography>
      </SoftBox>
      <SoftInput
        type={type}
        required
        placeholder={placeholder}
        value={value}
        id={name}
        name={name}
        onChange={onChange}
      />
    </SoftBox>
  );
};

FormInput.defaultProps = {
  type: 'text',
  onChange: () => {}
};

FormInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.any,
  value: PropTypes.string
};

export default FormInput;
