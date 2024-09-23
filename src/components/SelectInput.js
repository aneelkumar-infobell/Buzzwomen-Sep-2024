import React from 'react';
import { Typography, Stack, Select, MenuItem } from '@mui/material';

const SelectInput = ({
  id,
  name,
  label,
  kannadaLabel = '',
  color = 'common',
  variant = 'standard',
  required = false,
  onChange,
  value,
  options,
  optionLabelKey = 'name',
  optionValueKey = 'id',
}) => {
  return (
    <Stack mb={3}>
      <Typography style={{ color: '#ff7424' }}>
        {label} {kannadaLabel && `${kannadaLabel} `}
        {required && '*'}
      </Typography>
      <Select
        id={id}
        name={name}
        color={color}
        label={label}
        variant={variant}
        required={required}
        onChange={onChange}
        value={value || ''}
      >
        {options.map((option) => (
          <MenuItem key={option[optionValueKey]} value={option[optionValueKey]}>
            {option[optionLabelKey]}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default SelectInput;
