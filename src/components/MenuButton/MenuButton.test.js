import { fireEvent, render, screen } from '@testing-library/react';
import MenuButton from '.';

describe('MenuButton Component', () => {
	test('should display child', () => {
		render(
			<MenuButton elements={[]}>
				<div>I am the child</div>
			</MenuButton>
		);

		expect(screen.getByText('I am the child')).toBeInTheDocument();
	});

	test('display the childs only when user clicks', () => {
		render(
			<MenuButton
				elements={[
					{ value: 10, name: 'Test 1' },
					{ value: 20, name: 'Hi' },
				]}
			>
				<button></button>
			</MenuButton>
		);

		expect(screen.queryByText('Test 1')).not.toBeVisible();
		expect(screen.queryByText('Hi')).not.toBeVisible();

		fireEvent.click(screen.getByRole('button'));

		expect(screen.queryByText('Test 1')).toBeVisible();
		expect(screen.queryByText('Hi')).toBeVisible();
	});

	test('when child is clicked, child items should be invisible', () => {
		render(
			<MenuButton
				elements={[
					{ value: 10, name: 'Test 1' },
					{ value: 20, name: 'Hi' },
				]}
			>
				<button></button>
			</MenuButton>
		);

		fireEvent.click(screen.getByRole('button'));
		fireEvent.click(screen.queryByText('Test 1'));

		expect(screen.queryByText('Test 1')).not.toBeVisible();
		expect(screen.queryByText('Hi')).not.toBeVisible();
	});
});
