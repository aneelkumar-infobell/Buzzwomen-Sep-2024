import React from 'react';
import { Typography, Stack, TextField } from '@mui/material';

const TextInput = ({
  id,
  name,
  label,
  kannadaLabel = '',
  type = 'text',
  required = false,
  inputProps = {},
  color = 'common',
  variant = 'outlined',
  onChange,
  value,
  placeholder = '',
}) => {
  return (
    <Stack mb={3}>
      <Typography style={{ color: '#ff7424' }}>
        {label} {kannadaLabel && `${kannadaLabel} `}
        {required && '*'}
      </Typography>
      <TextField
        id={id}
        name={name}
        type={type}
        required={required}
        inputProps={inputProps}
        label={placeholder}
        variant={variant}
        color={color}
        onChange={onChange}
        value={value || ''}
      />
    </Stack>
  );
};

export default TextInput;
