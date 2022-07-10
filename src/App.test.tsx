import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders application logo', () => {
  render(<App />);
  const linkElement = screen.getByAltText(/logo/i);
  expect(linkElement).toBeInTheDocument();
});
