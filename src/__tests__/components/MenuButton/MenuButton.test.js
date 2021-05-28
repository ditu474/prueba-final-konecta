import { fireEvent, render, screen } from '@testing-library/react';
import MenuButton from 'components/MenuButton';

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
			<MenuButton elements={[{ name: 'Test 1' }, { name: 'Hi' }]}>
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
					{ name: 'Test 1', action: jest.fn() },
					{ name: 'Hi', action: jest.fn() },
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

	test('when child is clicked, should call the action prop', () => {
		const actionSpy = jest.fn();
		render(
			<MenuButton
				elements={[
					{ name: 'Test 1', action: actionSpy },
					{ name: 'Hi', action: jest.fn() },
				]}
			>
				<button></button>
			</MenuButton>
		);

		fireEvent.click(screen.getByRole('button'));
		fireEvent.click(screen.queryByText('Test 1'));

		expect(actionSpy).toHaveBeenCalledTimes(1);
	});
});
