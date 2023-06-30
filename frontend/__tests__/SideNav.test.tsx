// @ts-ignore
import React from 'react';
import '../__mocks__/matchMedia.mock'; //
import {act, render, screen} from '@testing-library/react';
import {expect, test, describe, jest} from '@jest/globals';
import {SideNav} from '../src/Components/Navbar/SideNav';
import {ThemeProvider} from '@mui/material';
import theme from '../src/config/theme';
import {BrowserRouter} from 'react-router-dom';

// Might be need for Component uses useLocation from react-router-dom
// Following must be placed inside test => adjust pathname if needed
// mockUseLocationValue.pathname = '/';
const mockUseLocationValue = {
	pathname: '/testroute',
	search: '',
	hash: '',
	state: null,
};
jest.mock('react-router', () => ({
	...(jest.requireActual('react-router') as {}),
	useLocation: jest.fn().mockImplementation(() => {
		return mockUseLocationValue;
	}),
}));

// TODO: More tests once the Roles and Buttons are defined
describe.only('SideNav Component', () => {
	beforeEach(async () => {
		await act(async () =>
			render(
				// needed for styling
				<ThemeProvider theme={theme}>
					{/* needed for Links */}
					<BrowserRouter>
						<SideNav />
					</BrowserRouter>
				</ThemeProvider>
			)
		);
	});

	test('render the content', async () => {
		const department = screen.queryAllByText('Department');
		const login = await screen.findAllByLabelText('login');

		const links = await screen.findAllByRole('link');

		console.log(login.length);

		expect(department.length).toBe(1);
		expect(login.length).toBe(1);
		expect(links.length).toBe(8);
	});
});
