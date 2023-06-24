import React from 'react';
import App from '../src/App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders hi element', () => {
  render(<App />);
  const hiElement = screen.getByText(/This is Minon Mentor/i);
  expect(hiElement).toBeInTheDocument();
});

test('check if true is equal to true', () => {
  expect(true).toBe(true);
});