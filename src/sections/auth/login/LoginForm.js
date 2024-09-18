import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Card, CardActions, CardContent, Button, TextField, Grid, Checkbox, FormControlLabel } from '@mui/material';

export default function LoginForm() {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = async () => {
		navigate('/dashboard/app', { replace: true });
	};

	return (
		<>
			{/* <Card sx={{ minWidth: 275 }}>
				<CardContent>
					<div style={{
						marginBottom: '15px'
					}}>
						<TextField id="phoneNumber" fullWidth='true' label="Phone Number" variant="outlined" type="number" autoFocus='true' inputProps={{maxLength: 10}} />
					</div>
					<div>
						<TextField id="password" fullWidth='true' label="Password" variant="outlined" type="password" />
					</div>
					<Grid container spacing={2}>
						<Grid item md={6}>
							<FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
						</Grid>
						<Grid item md={6}>
							<h4 style={{ textAlign: 'right', paddingTop: '10px' }}><Link href="#" underline="none">Forgot Password?</Link></h4>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions>
					<Button style={{ marginLeft: '18px' }} fullWidth='true' variant="contained" onClick={() => onSubmit()}>Login</Button>
				</CardActions>
			</Card> */}
		</>
	);
}
