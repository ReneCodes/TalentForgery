// @ts-ignore
import React from 'react';
import {render, screen} from '@testing-library/react';
import PieChartComp from '../src/Components/PieChart/PieChart'
import {expect, test, describe} from '@jest/globals';

describe('pie chary', () => {
  test('renders the content with the correct labels', () => {
    const props = {
      width: 500,
      passed: 50,
      todo: 10,
      failed: 5,
    };

    render(<PieChartComp {...props} />)
    const watched = screen.queryByText('Watched : 50');
    const toWatch = screen.queryByText('toWatch : 10');
    const overdue = screen.queryByText('Overdue : 5');

    expect(watched).toBeDefined();
    expect(toWatch).toBeDefined();
    expect(overdue).toBeDefined();
  })

  test('should still render with failed input as 0', () => {
    const props = {
      width: 500,
      passed: 50,
      todo: 10,
      failed: 0
    };

    render(<PieChartComp {...props} />)
    const watched = screen.queryByText('Watched : 50');
    const toWatch = screen.queryByText('toWatch : 10');
    const overdue = screen.queryByText('Overdue :');

    expect(watched).toBeDefined();
    expect(toWatch).toBeDefined();
    expect(overdue).toBeNull();
  })
})