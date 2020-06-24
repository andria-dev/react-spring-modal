import * as React from 'react';
import {fireEvent, render, RenderResult, waitFor} from '@testing-library/react';
import App from './App';

let screen: RenderResult
beforeEach(() => {
  screen = render(<App/>)
})

describe('<SignUp>', () => {
  let button
  beforeEach(async () => {
    fireEvent.click(screen.getByText('Sign Up Now'))
  })

  test('should open', async () => {
    await waitFor(() => screen.getByTestId('sign-up-modal'))
    expect(screen.getByRole('heading')).toHaveTextContent('Sign Up')
  })
})

