import React from 'react';
import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';

const TextInput = ({
  id,
  label,
  name,
  value,
  onChange,
  card = true,
  kannadaLabel = '',
  required,
  placeholder = '',
  disabled = false,
  type = 'text',
  inputProps,
  InputProps,
  maxLength,
}) => {
  const handleChange = (event) => {
    let newValue = event.target.value;
    if (type === 'number' && maxLength) {
      newValue = newValue.replace(/\D/g, '');
      newValue = newValue.slice(0, maxLength);
      newValue = newValue || '';
    }

    onChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: newValue,
      },
    });
  };
  const customInput = () => (
    <Stack mb={3}>
      <Typography style={{ color: '#ff7424', paddingBottom: '10px', paddingTop: '10px' }}>
        {label}&nbsp;&nbsp;&nbsp;{kannadaLabel && `${kannadaLabel} `}
        {required && '*'}
      </Typography>
      <TextField
        id={id}
        type={type}
        label={placeholder}
        required={required}
        disabled={disabled}
        variant="outlined"
        color="common"
        name={name}
        maxLength={maxLength}
        onChange={handleChange}
        value={value || ''}
        InputProps={{
          ...InputProps,
          inputProps: {
            ...inputProps,
            ...InputProps?.inputProps,
            inputMode: type === 'number' ? 'numeric' : inputProps?.inputMode,
            pattern: type === 'number' ? '[0-9]*' : inputProps?.pattern,
          },
        }}
      />
    </Stack>
  );

  return (
    <>
      {card ? (
        <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
          <CardContent>{customInput()}</CardContent>
        </Card>
      ) : (
        customInput()
      )}
    </>
  );
};

export default TextInput;
