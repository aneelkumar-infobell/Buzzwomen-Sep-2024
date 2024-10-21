import React from 'react';
import { Typography, Stack, Select, MenuItem, Card, CardContent } from '@mui/material';

const SelectInput = ({
  card = true,
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
  optionLabelKey = name === 'gf_id' ? 'first_name' : 'name',
  optionValueKey = 'id',
  disabled = false,
}) => {
  const SelectContent = () => (
    <Stack mb={3}>
      <Typography style={{ color: '#ff7424', paddingBottom: '10px', paddingTop: '10px' }}>
        {label} &nbsp;&nbsp;&nbsp; {kannadaLabel && `${kannadaLabel} `}
        {required && '*'}
      </Typography>
      <Select
        key={id}
        id={id}
        name={name}
        color={color}
        label={label}
        variant={variant}
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value || ''}
      >
        {options.map((option) => (
          <MenuItem
            data-id={option[optionValueKey]}
            key={option[optionValueKey]}
            value={name === 'gf_id' || name === 'cast' ? option['id'] : option[optionLabelKey]}
          >
            {option[optionLabelKey]}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );

  return (
    <>
      {card ? (
        <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
          <CardContent>
            <SelectContent />
          </CardContent>
        </Card>
      ) : (
        <SelectContent />
      )}
    </>
  );
};

export default SelectInput;
