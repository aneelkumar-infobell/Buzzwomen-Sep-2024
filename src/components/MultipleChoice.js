import { Card, CardContent, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import React from 'react';

const MultipleChoice = ({
  card = true,
  label,
  kannadaLabel = '',
  name,
  required,
  handleResources,
  options,
  disabled = false,
  selectedOption = [],
}) => {
  return (
    <>
      {card ? (
        <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
          <CardContent>
            <MultipleChoiceContent
              label={label}
              kannadaLabel={kannadaLabel}
              required={required}
              name={name}
              handleResources={handleResources}
              options={options}
              selectedOption={selectedOption}
              disabled={disabled}
            />
          </CardContent>
        </Card>
      ) : (
        <MultipleChoiceContent
          label={label}
          kannadaLabel={kannadaLabel}
          required={required}
          name={name}
          handleResources={handleResources}
          options={options}
          selectedOption={selectedOption}
          disabled={disabled}
        />
      )}
    </>
  );
};

const MultipleChoiceContent = ({
  label,
  kannadaLabel,
  required,
  name,
  handleResources,
  options,
  selectedOption,
  disabled,
}) => (
  <>
    <Typography style={{ color: '#ff7424' }}>
      {label}
      {kannadaLabel}
      {required && '*'}
    </Typography>
    <Stack mt={2}>
      <FormGroup>
        {options.map((value) => (
          <FormControlLabel
            key={value.id}
            value={value.name}
            control={<Checkbox disabled checked={selectedOption.includes(value.name)} style={{ color: '#595959' }} />}
            label={value.name}
            onChange={(event) => handleResources(name, event)}
          />
        ))}
      </FormGroup>
    </Stack>
  </>
);

export default MultipleChoice;
