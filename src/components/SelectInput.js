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
  optionLabelKey = 'name',
  optionValueKey = 'id',
}) => {
  const SelectContent = () => (
    <Stack mb={3}>
      <Typography style={{ color: '#ff7424' }}>
        {label} {kannadaLabel && `${kannadaLabel} `}
        {required && '*'}
      </Typography>
      <Select
        key={id}
        id={id}
        name={name}
        color={color}
        label={label}
        variant={variant}
        // required={required}
        onChange={onChange}
        value={value || ''}
      >
        {options.map((option) => (
          <MenuItem key={option[optionValueKey]} value={option[optionLabelKey]}>
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
