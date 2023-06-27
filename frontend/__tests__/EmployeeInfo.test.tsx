import { render, screen } from '@testing-library/react';
import {expect, test, describe} from '@jest/globals';
import OutstandingTasks from '../src/Components/EmployeeInfo/OutstandingTasks';

describe('outstanding tasks', () => {
  test('renders the tasks provided in a list', () => {
    render(<OutstandingTasks taskArr={['Fire Safety', 'Security', 'Workplace Hygiene']}/>)

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBe(3);

    expect(listItems[0].textContent).toBe('Fire Safety');
    expect(listItems[1].textContent).toBe('Security');
    expect(listItems[2].textContent).toBe('Workplace Hygiene');
  })
})