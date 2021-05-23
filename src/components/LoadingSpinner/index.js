import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		margin: theme.spacing(2),
	},
}));

export default function LoadingSpinner() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress color="secondary" />
		</div>
	);
}
