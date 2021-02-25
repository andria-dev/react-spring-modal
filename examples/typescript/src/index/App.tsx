import * as React from 'react';
import { useState, useEffect } from 'react';

import { Settings } from './App/Settings';
import { SignUp } from './App/SignUp';
import { Menu } from './App/Menu';
import { State } from './shared/types';

import 'react-spring-modal/dist/commonjs/bundle.css';
import './App/App.css';

function App() {
  const [state, setState] = useState<State>({ type: 'idle' });

  useEffect(() => {
    function themeChangeHandler(queryEvent: MediaQueryListEvent | MediaQueryList) {
      const oldTheme = queryEvent.matches ? 'light-mode' : 'dark-mode';
      const newTheme = queryEvent.matches ? 'dark-mode' : 'light-mode';

      document.body.classList.remove(oldTheme);
      document.body.classList.add(newTheme);
    }

    const query = matchMedia('(prefers-color-scheme: dark)');
    themeChangeHandler(query);

    query.addEventListener('change', themeChangeHandler);
    return () => {
      query.removeEventListener('change', themeChangeHandler);
    };
  }, []);

  return (
    <div className="App">
      <Menu state={state} setState={setState} />
      <Settings state={state} setState={setState} />

      <h1>React Spring Modal TypeScript Example</h1>
      <p>
        This example was made using <a href="https://www.snowpack.dev/">Snowpack</a> and{' '}
        <a href="https://npm.im/react-spring-modal">React Spring Modal</a>. This site was designed to show that React
        Spring Modal is fully-typed and compatible with TypeScript.
      </p>
      <p>The components used here are:</p>
      <ul>
        <li>
          <code>&lt;CenterModal&gt;</code> for the Sign Up modal.
        </li>
        <li>
          <code>&lt;BottomModal&gt;</code> for the Settings modal.
        </li>
        <li>
          <code>&lt;ExpandModal&gt;</code> for the Navigation Menu modal.
        </li>
      </ul>

      <SignUp state={state} setState={setState} />
    </div>
  );
}

export default App;
