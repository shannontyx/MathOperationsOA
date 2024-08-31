import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react';  // Updated import
import App from './App';

// Mock the fetch function
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url === '/api/add') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: 12 }), 
      });
    } else if (url === '/api/subtract') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: 8 }), 
      });
    } else {
      return Promise.resolve({
        ok: false,
        json: () => Promise.reject(new Error('Network error')),
      })
    }
  });
});

afterEach(() => {
  global.fetch.mockClear();
});

test('renders Math Operations header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Math Operations/i);
  expect(headerElement).toBeInTheDocument();
});

test('adds two numbers correctly', async () => {
  render(<App />);

  const num1Input = screen.getByPlaceholderText(/First number/i);
  const num2Input = screen.getByPlaceholderText(/Second number/i);
  const addButton = screen.getByText(/Add/i);
  
  await act( async () => {
    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '2' } });
    fireEvent.click(addButton);
  });

  const result = screen.getByText(/Result: 12/i);
  expect(result).toBeInTheDocument();
});

test('subtracts two numbers correctly', async () => {
  render(<App />);

  const num1Input = screen.getByPlaceholderText(/First number/i);
  const num2Input = screen.getByPlaceholderText(/Second number/i);
  const subtractButton = screen.getByText(/Subtract/i);

  await act( async() => {
    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '2' }});
    fireEvent.click(subtractButton);
  });

  const result = screen.getByText(/Result: 8/i);
  expect(result).toBeInTheDocument;
})

test('handles fetch error for addition', async () => {
  global.fetch.mockImplementationOnce(() => 
    Promise.resolve({
      ok: false,
      json: () => Promise.reject(new Error('Failed to fetch')),
    })
  );
  
  render(<App />);

  const num1Input = screen.getByPlaceholderText(/First number/i);
  const num2Input = screen.getByPlaceholderText(/Second number/i);
  const addButton = screen.getByText(/Add/i);
  
  fireEvent.change(num1Input, { target: { value: '10' } });
  fireEvent.change(num2Input, { target: { value: '2' } });
  fireEvent.click(addButton);

  const alertMessage = await screen.findByText(/An error occurred while performing the addition./i);
  expect(alertMessage).toBeInTheDocument();
});

test('handles fetch error for subtraction', async () => {
  global.fetch.mockImplementationOnce(() => 
    Promise.resolve({
      ok: false,
      json: () => Promise.reject(new Error('Failed to fetch')),
    })
  );

  render(<App />);

  const num1Input = screen.getByPlaceholderText(/First number/i);
  const num2Input = screen.getByPlaceholderText(/Second number/i);
  const subtractButton = screen.getByText(/Subtract/i);
  
  fireEvent.change(num1Input, { target: { value: '10' } });
  fireEvent.change(num2Input, { target: { value: '2' } });
  fireEvent.click(subtractButton);

  const alertMessage = await screen.findByText(/An error occurred while performing the subtraction./i);
  expect(alertMessage).toBeInTheDocument();
});