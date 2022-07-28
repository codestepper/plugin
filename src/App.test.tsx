// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import * as chrome from "sinon-chrome";
window.chrome = chrome;

test('renders application logo', () => {
  render(<App />);
  const del = screen.getByText(/Delete/i);
  expect(del).toBeInTheDocument();
});
