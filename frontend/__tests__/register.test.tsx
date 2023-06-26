// @ts-ignore
import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import Register from '../src/Pages/Register';
import {expect, test, describe} from '@jest/globals';

describe('Register', () => {
	test('renders the content', async () => {
		await act(async () => render(<Register />));

		const visibility = screen.queryByLabelText('toggle password visibility') as HTMLButtonElement;

		act(() => {
			fireEvent.click(visibility);
		});

		const inputs = screen.queryAllByRole('textbox');
		expect(inputs.length).toBe(7);
	});

	test('the form works', async () => {
		await act(async () => render(<Register />));

		const visibility = screen.queryByLabelText('toggle password visibility') as HTMLButtonElement;

		await act(async () => fireEvent.click(visibility));

		const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];

		await act(async () => {
			fireEvent.change(inputs[0], {target: {value: 'James'}});
			fireEvent.change(inputs[1], {target: {value: 'Vowles'}});
			fireEvent.change(inputs[2], {target: {value: 'jamesvowles@gofast.com'}});
			fireEvent.change(inputs[3], {target: {value: 'Albon_1234'}});
			fireEvent.change(inputs[4], {target: {value: 'Albon_1234'}});
			fireEvent.change(inputs[5], {target: {value: 'albonfan123@hotmail.com'}});
			fireEvent.change(inputs[6], {target: {value: '07399583230'}});
		});

		expect(inputs[0].value).toBe('James');
		expect(inputs[1].value).toBe('Vowles');
		expect(inputs[2].value).toBe('jamesvowles@gofast.com');
		expect(inputs[3].value).toBe('Albon_1234');
		expect(inputs[4].value).toBe('Albon_1234');
		expect(inputs[3].value).toBe(inputs[4].value);
		expect(inputs[5].value).toBe('albonfan123@hotmail.com');
		expect(inputs[6].value).toBe('07399583230');

		console.log = jest.fn();
		window.alert = jest.fn();

		const buttons = screen.queryAllByRole('button') as HTMLButtonElement[];

		expect(buttons.length).toBe(2);

		await act(async () => {
			fireEvent.click(buttons[1]);
		});
		expect(inputs[0].value).toBe('');

		expect(console.log).toHaveBeenCalledWith({
			confirmPassword: 'Albon_1234',
			email: 'jamesvowles@gofast.com',
			firstName: 'James',
			lastname: 'Vowles',
			password: 'Albon_1234',
			phoneNumber: '07399583230',
			secondEmail: 'albonfan123@hotmail.com',
		});
	});

	test('second email and phone number should be optional', async () => {
		await act(async () => render(<Register />));

		const visibility = screen.queryByLabelText('toggle password visibility') as HTMLButtonElement;

		await act(async () => {
			fireEvent.click(visibility);
		});

		const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];

		await act(async () => {
			fireEvent.change(inputs[0], {target: {value: 'James'}});
			fireEvent.change(inputs[1], {target: {value: 'Vowles'}});
			fireEvent.change(inputs[2], {target: {value: 'jamesvowles@gofast.com'}});
			fireEvent.change(inputs[3], {target: {value: 'Albon_1234'}});
			fireEvent.change(inputs[4], {target: {value: 'Albon_1234'}});
		});

		expect(inputs[0].value).toBe('James');
		expect(inputs[1].value).toBe('Vowles');
		expect(inputs[2].value).toBe('jamesvowles@gofast.com');
		expect(inputs[3].value).toBe('Albon_1234');
		expect(inputs[4].value).toBe('Albon_1234');
		expect(inputs[3].value).toBe(inputs[4].value);

		console.log = jest.fn();
		window.alert = jest.fn();

		const buttons = screen.queryAllByRole('button') as HTMLButtonElement[];

		await act(async () => {
			fireEvent.click(buttons[1]);
		});

		expect(console.log).toHaveBeenCalledWith({
			confirmPassword: 'Albon_1234',
			email: 'jamesvowles@gofast.com',
			firstName: 'James',
			lastname: 'Vowles',
			password: 'Albon_1234',
			phoneNumber: '',
			secondEmail: '',
		});
	});
});

describe('edge Cases', () => {
	test('password must be more than 8 characters', async () => {
		await act(async () => render(<Register />));

		const visibility = screen.queryByLabelText('toggle password visibility') as HTMLButtonElement;

		await act(async () => {
			fireEvent.click(visibility);
		});
		const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];

		await act(async () => {
			fireEvent.change(inputs[0], {target: {value: 'James'}});
			fireEvent.change(inputs[1], {target: {value: 'Vowles'}});
			fireEvent.change(inputs[2], {target: {value: 'jamesvowles@gofast.com'}});
			fireEvent.change(inputs[3], {target: {value: 'Al_12'}});
			fireEvent.change(inputs[4], {target: {value: 'Al_12'}});
		});

		expect(inputs[0].value).toBe('James');
		expect(inputs[1].value).toBe('Vowles');
		expect(inputs[2].value).toBe('jamesvowles@gofast.com');
		expect(inputs[3].value).toBe('Al_12');
		expect(inputs[4].value).toBe('Al_12');
		expect(inputs[3].value).toBe(inputs[4].value);

		console.log = jest.fn();
		window.alert = jest.fn();

		const buttons = screen.queryAllByRole('button') as HTMLButtonElement[];

		await act(async () => {
			fireEvent.click(buttons[1]);
		});

		expect(inputs[0].value).not.toBe('');
		expect(console.log).not.toHaveBeenCalled();
	});

	test('password must be a mix of alphanumeric characters', async () => {
		await act(async () => render(<Register />));

		const visibility = screen.queryByLabelText('toggle password visibility') as HTMLButtonElement;

		await act(async () => {
			fireEvent.click(visibility);
		});

		const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];

		await act(async () => {
			fireEvent.change(inputs[0], {target: {value: 'James'}});
			fireEvent.change(inputs[1], {target: {value: 'Vowles'}});
			fireEvent.change(inputs[2], {target: {value: 'jamesvowles@gofast.com'}});
			fireEvent.change(inputs[3], {target: {value: '12345678'}});
			fireEvent.change(inputs[4], {target: {value: '12345678'}});
		});
		expect(inputs[0].value).toBe('James');
		expect(inputs[1].value).toBe('Vowles');
		expect(inputs[2].value).toBe('jamesvowles@gofast.com');
		expect(inputs[3].value).toBe('12345678');
		expect(inputs[4].value).toBe('12345678');
		expect(inputs[3].value).toBe(inputs[4].value);

		console.log = jest.fn();
		window.alert = jest.fn();

		const buttons = screen.queryAllByRole('button') as HTMLButtonElement[];

		await act(async () => {
			fireEvent.click(buttons[1]);
		});

		expect(inputs[0].value).not.toBe('');
		expect(console.log).not.toHaveBeenCalled();
	});

	test('passwords must match', async () => {
		await act(async () => render(<Register />));

		const visibility = screen.queryByLabelText('toggle password visibility') as HTMLButtonElement;

		await act(async () => {
			fireEvent.click(visibility);
		});

		const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];

		await act(async () => {
			fireEvent.change(inputs[0], {target: {value: 'James'}});
			fireEvent.change(inputs[1], {target: {value: 'Vowles'}});
			fireEvent.change(inputs[2], {target: {value: 'jamesvowles@gofast.com'}});
			fireEvent.change(inputs[3], {target: {value: 'Albon_123'}});
			fireEvent.change(inputs[4], {target: {value: 'Albon_234'}});
		});

		expect(inputs[0].value).toBe('James');
		expect(inputs[1].value).toBe('Vowles');
		expect(inputs[2].value).toBe('jamesvowles@gofast.com');
		expect(inputs[3].value).toBe('Albon_123');
		expect(inputs[4].value).toBe('Albon_234');

		console.log = jest.fn();
		window.alert = jest.fn();

		const buttons = screen.queryAllByRole('button') as HTMLButtonElement[];

		await act(async () => {
			fireEvent.click(buttons[1]);
		});

		expect(inputs[0].value).not.toBe('');
		expect(console.log).not.toHaveBeenCalled();
	});
});
