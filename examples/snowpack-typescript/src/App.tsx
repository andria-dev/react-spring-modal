import * as React from 'react'
import {FormEvent, useState} from "react";

import 'react-spring-modal/dist/index.css'
import {BottomModal, CenterModal} from 'react-spring-modal/dist/index.m.js';

import './index/App/App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons/faCogs";

interface State {
  type: string

  [s: string]: any
}

function App() {
  const [state, setState] = useState<State>({type: 'idle'})

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const username = formData.get('username') as string
    if (['admin', 'john_doe47', 'username', 'test'].includes(username)) {
      setState({
        type: 'invalid-sign-up',
        errorWith: 'username',
        message: `Username "${username}" has already been taken.`
      })
    } else {
      setState({type: 'idle'})
    }
  }

  let usernameErrorMessage = null
  if (state.type === 'invalid-sign-up' && state.errorWith === 'username') {
    usernameErrorMessage = <p className="error App__sign-up-form--error">{state.message}</p>
  }

  return (
    <div className="App">
      <h1>React Spring Modal TypeScript Example</h1>
      <p>This example was made using <a href="https://www.snowpack.dev/">Snowpack</a> and <a
        href="https://npm.im/react-spring-modal">React Spring Modal</a>. This site was designed to show that React
        Spring Modal is fully-typed and compatible with TypeScript.</p>
      <p>The components used here are:</p>
      <ul>
        <li><code>&lt;CenterModal&gt;</code> for the Sign Up modal.</li>
        <li><code>&lt;BottomModal&gt;</code> for the Settings modal.</li>
      </ul>

      <button className="App__sign-up-button" onClick={() => setState({type: 'sign-up'})}>Sign Up Now</button>
      <button className="App__settings-button" title="Open settings" aria-label="Open settings" onClick={() => setState({type: 'settings'})}>
        <FontAwesomeIcon icon={faCogs}/>
      </button>

      <CenterModal
        isOpen={state.type === 'sign-up' || state.type === 'invalid-sign-up'}
        onRequestClose={() => setState({type: 'idle'})}
        className="App__sign-up-modal"
      >
        <h1>Sign Up</h1>
        <p>Join our team now! Make sure you choose a secure password and unique username that suits your style.</p>
        <form className="App__sign-up-form" onSubmit={handleSubmit}>
          <label htmlFor="username-input">Username</label>
          <input id="username-input" name="username" placeholder="john_doe47" aria-invalid={!!usernameErrorMessage} required/>
          {usernameErrorMessage}

          <label htmlFor="password-input">Password</label>
          <input type="password" id="password-input" name="password" placeholder="••••••••••••••••••" minLength={14} required/>

          <button type="submit">Sign Up</button>
        </form>
      </CenterModal>
      <BottomModal isOpen={state.type === 'settings'} onRequestClose={() => setState({type: 'idle'})}>
        <h1>Settings</h1>
        <p>Modify your settings here and make this site your own.</p>

        <form>
          <label htmlFor="checkbox">Checkbox</label>
          <input type="checkbox" id="checkbox" name="checkbox" />

          <button type="submit">Save</button>
        </form>
      </BottomModal>
    </div>
  );
}

export default App;
