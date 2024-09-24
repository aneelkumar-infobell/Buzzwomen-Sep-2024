import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';

const TextInput = ({ id, label, name, value, onChange, card = true, kannadaLabel = '', required }) => {
  // Custom input function for rendering the Stack with the TextField and label
  const customInput = () => (
    <Stack mb={3}>
      <Typography style={{ color: '#ff7424' }}>
        {label} {kannadaLabel && `${kannadaLabel} `}
        {required && '*'}
      </Typography>
      <TextField
        id={id}
        label={label}
        // required={required}
        variant="outlined"
        color="common"
        name={name}
        onChange={onChange}
        value={value || ''}
      />
    </Stack>
  );

  return (
    <>
      {card ? (
        <Card style={{ marginTop: 40, backgroundColor: '#F6F8FB', borderRadius: 20 }}>
          <CardContent>
            {customInput()} 
          </CardContent>
        </Card>
      ) : (
        customInput() 
      )}
    </>
  );
};

export default TextInput;
