import { render, screen } from '@testing-library/react';
import MenuButton from '.';

describe('MenuButton Component', () => {
	test('should display child', () => {
		render(
			<MenuButton>
				<div>I am the child</div>
			</MenuButton>
		);

		expect(screen.getByText('I am the child')).toBeInTheDocument();
	});
});
