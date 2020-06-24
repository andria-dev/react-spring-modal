import * as React from 'react';
import { CenterModal } from 'react-spring-modal/dist/index.m.js';
import { FormEvent } from 'react';
import { StateProps } from '../shared/types';
import './SignUp/SignUp.css';

export function SignUp({ state, setState }: StateProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get('username') as string;
    if (['admin', 'john_doe47', 'username', 'test'].includes(username)) {
      setState({
        type: 'invalid-sign-up',
        errorWith: 'username',
        message: `Username "${username}" has already been taken.`,
      });
    } else {
      setState({ type: 'idle' });
    }
  }

  let usernameErrorMessage = null;
  if (state.type === 'invalid-sign-up' && state.errorWith === 'username') {
    usernameErrorMessage = <p className="error Form--error">{state.message}</p>;
  }

  function close() {
    setState({ type: 'idle' });
  }

  return (
    <>
      <button
        className="SignUp__open-button"
        onClick={() => setState({ type: 'sign-up' })}
      >
        Sign Up Now
      </button>

      <CenterModal
        isOpen={state.type === 'sign-up' || state.type === 'invalid-sign-up'}
        onRequestClose={close}
        className="SignUp"
        data-testid="sign-up-modal"
      >
        <h1>Sign Up</h1>
        <p>
          Join our team now! Make sure you choose a secure password and unique
          username that suits your style.
        </p>
        <form className="SignUp__form Form" onSubmit={handleSubmit}>
          <label htmlFor="username-input">Username</label>
          <input
            id="username-input"
            name="username"
            placeholder="john_doe47"
            aria-invalid={!!usernameErrorMessage}
            required
          />
          {usernameErrorMessage}

          <label htmlFor="password-input">Password</label>
          <input
            type="password"
            id="password-input"
            name="password"
            placeholder="••••••••••••••••••"
            minLength={14}
            required
          />

          <section className="Form__actions">
            <button type="submit">Sign Up</button>
            <button type="button" onClick={close}>
              Cancel
            </button>
          </section>
        </form>
      </CenterModal>
    </>
  );
}
