import * as React from 'react';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import App from './App';

Object.defineProperty(globalThis, 'matchMedia', {
  writable: false,
  value() {
    return {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    };
  }
});

describe('<SignUp>', () => {
  test('should open', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /sign up now/i }));
    expect(await screen.findByRole('heading', { name: /sign up/i })).toBeInTheDocument();
  });

  describe('should close when', () => {
    beforeEach(async () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /sign up now/i }));
      await waitFor(() => screen.getByRole('heading', { name: /sign up/i }));
    });

    test('a <ModalCloseTarget> is clicked', async () => {
      fireEvent.click(await screen.findByRole('button', { name: /cancel/i }));
      await waitFor(() => expect(screen.queryByRole('heading', { name: /sign up/i })).not.toBeInTheDocument());
    });

    test('the Escape key is pressed', async () => {
      fireEvent.keyDown(screen.getByTestId('sign-up-modal'), { key: 'Escape' });
      fireEvent.keyUp(screen.getByTestId('sign-up-modal'), { key: 'Escape' });
      await waitFor(() => expect(screen.queryByRole('heading', { name: /sign up/i })).not.toBeInTheDocument());
    });

    test('the overlay is clicked on', async () => {
      fireEvent.mouseDown(screen.getByTestId('sign-up-overlay'));
      fireEvent.click(screen.getByTestId('sign-up-overlay'));
      await waitFor(() => expect(screen.queryByRole('heading', { name: /sign up/i })).not.toBeInTheDocument());
    });
  });
});
