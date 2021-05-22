import { fireEvent, render, screen } from '@testing-library/react';
import { useSnackbar } from 'notistack';
import React from 'react';
import { act } from 'react-dom/test-utils';
import SnackbarProvider from '.';

const TestComponent = () => {
	const [numberOfSnackbars, setNumberOfSnackbars] = React.useState(1);
	const { enqueueSnackbar } = useSnackbar();

	const clickHandler = () => {
		enqueueSnackbar(`Snackbar ${numberOfSnackbars}`);
		setNumberOfSnackbars((prevNum) => prevNum + 1);
	};

	return <button onClick={clickHandler}>Open Snackbar</button>;
};

describe('Snackbar Provider', () => {
	test('render a snackbar', () => {
		render(
			<SnackbarProvider>
				<TestComponent />
			</SnackbarProvider>
		);

		act(() => {
			fireEvent.click(screen.getByText('Open Snackbar'));
		});

		expect(screen.getByText('Snackbar 1')).toBeInTheDocument();
	});
});
