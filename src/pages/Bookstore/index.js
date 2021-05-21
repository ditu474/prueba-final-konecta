import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';

export default function Bookstore() {
	return (
		<>
			<form name="NewBookstore">
				<TextField variant="outlined" placeholder="Nombre de librería" />
				<Button variant="contained" color="primary">
					Crear
				</Button>
			</form>
		</>
	);
}
