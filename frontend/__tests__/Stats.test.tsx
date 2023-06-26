import { render, screen} from '@testing-library/react';
import Stats from '../src/Components/Stats/Stats';
import {expect, test, describe} from '@jest/globals';

describe('stats', () => {
  test('renders the content', () => {
    render(<Stats />)
    const passed = screen.queryAllByText('Passed');
    expect(passed.length).toBe(2);

    const failed = screen.queryAllByText('Failed');
    expect(failed.length).toBe(2);

    const todo = screen.queryAllByText('Todo');
    expect(todo.length).toBe(2);

    const total = screen.queryAllByText('Total');
    expect(total.length).toBe(3);

    const watched = screen.queryByText('Watched');
    expect(watched).toBeDefined();

    const toWatch = screen.queryByText('To Watch');
    expect(toWatch).toBeDefined();
  })

  test('calculates the percentage', () => {
    render(<Stats />)
    const numbers = screen.queryAllByText(/\d+/);
    expect(numbers.length).toBe(11);

    let counter = 0;
    for(const numberEl of numbers) {
      const number = numberEl.textContent;
      if(number != null && number.includes('%')) {
        counter++;
      }
    }
    expect(counter).toBe(3);
  })
})