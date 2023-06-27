// @ts-ignore
import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import {Login} from '../src/Pages/Login';
import {expect, test, describe} from '@jest/globals';
import { jest } from '@jest/globals';


// TODO: Create fake axios or it will work on real DB
// FIXME: Create fake axios or it will work on real DB

describe('Login', () => {
	test('login renders the content', async () => {
		await act(async () => render(<Login />));

		const visibility = screen.queryByLabelText('toggle password visibility') as HTMLButtonElement;
		// unlock visibility of password field
		act(() => {
			fireEvent.click(visibility);
		});

		const inputs = screen.queryAllByRole('textbox');
		expect(inputs.length).toBe(2);
	});

	test('check that the login form works', async () => {
		await act(async () => render(<Login />));

		const visibility = screen.queryByLabelText('toggle password visibility') as HTMLButtonElement;

		await act(async () => fireEvent.click(visibility));

		const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];

		await act(async () => {
			fireEvent.change(inputs[0], {target: {value: 'muh@kuh.milk'}});
			fireEvent.change(inputs[1], {target: {value: '1secret_Password'}});
		});

		expect(inputs[0].value).toBe('muh@kuh.milk');
		expect(inputs[1].value).toBe('1secret_Password');

		// @ts-ignore
		console.log = jest.fn();

		// Login and password toggle btn
		const buttons = screen.queryAllByRole('button') as HTMLButtonElement[];
		expect(buttons.length).toBe(2);

		await act(async () => {
			fireEvent.click(buttons[1]);
		});
		expect(inputs[1].value).toBe('');

		expect(console.log).toHaveBeenCalledWith({
			email: 'muh@kuh.milk',
			password: '1secret_Password',
		});
	});
});

// TODO test for unhappy login aka. failed to login
