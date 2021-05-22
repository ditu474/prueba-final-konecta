import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

	return (
		<>
			<p data-testid="number-snackbar">{numberOfSnackbars}</p>
			<button onClick={clickHandler}>Open Snackbar</button>
		</>
	);
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

	test('render maximum 3 snackbars', async () => {
		render(
			<SnackbarProvider>
				<TestComponent />
			</SnackbarProvider>
		);

		expect(screen.getByTestId('number-snackbar').textContent).toBe('1');
		act(() => {
			fireEvent.click(screen.getByText('Open Snackbar'));
		});
		expect(screen.getByText('Snackbar 1')).toBeInTheDocument();

		expect(screen.getByTestId('number-snackbar').textContent).toBe('2');
		act(() => {
			fireEvent.click(screen.getByText('Open Snackbar'));
		});
		expect(screen.getByText('Snackbar 2')).toBeInTheDocument();

		expect(screen.getByTestId('number-snackbar').textContent).toBe('3');
		act(() => {
			fireEvent.click(screen.getByText('Open Snackbar'));
		});
		expect(screen.getByText('Snackbar 3')).toBeInTheDocument();

		expect(screen.getByTestId('number-snackbar').textContent).toBe('4');
		act(() => {
			fireEvent.click(screen.getByText('Open Snackbar'));
		});

		await waitFor(() => {
			expect(screen.getByText('Snackbar 4')).toBeInTheDocument();
			expect(screen.queryByText('Snackbar 1')).not.toBeInTheDocument();
		});
	});

	test('snackbar should disappear if close snackbar icon is clicked', async () => {
		render(
			<SnackbarProvider>
				<TestComponent />
			</SnackbarProvider>
		);

		act(() => {
			fireEvent.click(screen.getByText('Open Snackbar'));
		});

		fireEvent.click(screen.getByLabelText('close snackbar'));

		await waitFor(() => {
			expect(screen.queryByText('Snackbar 1')).not.toBeInTheDocument();
		});
	});
});
